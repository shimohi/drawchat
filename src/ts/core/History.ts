import DrawHistory = drawchat.core.DrawHistory;
import DrawMoment = drawchat.core.DrawMoment;
import DrawLayerMoment = drawchat.core.DrawLayerMoment;

import {Moment} from "./Moment";
import {MomentBuilder} from "./MomentBuilder";
import {HistoryNumberGenerator} from "./HistoryNumberGenerator";
import {LayerNumberGenerator} from "./LayerNumberGenerator";
import {DrawMessageBuilder} from "./DrawMessageBuilder";
import {HistoryNumberUtil} from "./HistoryNumberUtil";
export class History implements DrawHistory{

	private historyNumberNow:number = - 1;

	private historyNumbers:number[] = [];
	private sequencesHistoryNumbers:number[] = [];

	private map:{[key:number]:DrawMoment} = {};
	private listeners:any[] = [];

	private numberGenerator:HistoryNumberGenerator;
	private layerNumberGenerator:LayerNumberGenerator;

	constructor(
		numberGenerator:HistoryNumberGenerator,
	 	layerNumberGenerator:LayerNumberGenerator
	){
		this.numberGenerator = numberGenerator;
		this.layerNumberGenerator = layerNumberGenerator;
	}

	getLayers(historyNumber?:number):string[]{
		var historyNum = historyNumber;
		if(historyNum !== 0 && (!historyNum || historyNum < 0 )){
			historyNum = this.historyNumberNow;
		}
		let i = (this.sequencesHistoryNumbers.length - 1) | 0;
		if(historyNumber){
			i = HistoryNumberUtil.getHistoryIndex(this.sequencesHistoryNumbers,historyNum);
		}
		if(i < 0){
			return [];
		}
		let moment = this.map[this.historyNumbers[i]];
		return moment ? moment.getSequence() : [];
	}

	private noticeUpdate():void{
		let len = (this.listeners.length) | 0;
		let i = 0;
		while(i < len){
			this.listeners[i](this.historyNumberNow);
			i = (i + 1) | 0;
		}
		this.listeners = [];
	}

	getHistoryNumbers():number[] {
		return this.historyNumbers;
	}

	getNowHistoryNumber():number {
		return this.historyNumberNow;
	}

	getLastHistoryNumber():number {
		if(!this.historyNumbers || this.historyNumbers.length === 0){
			return -1;
		}
		return this.historyNumbers[this.historyNumbers.length - 1];
	}

	getFirstHistoryNumber():number {
		if(!this.historyNumbers || this.historyNumbers.length === 0){
			return -1;
		}
		return this.historyNumbers[0];
	}

	getMoments(
		from:number,
		to:number
	):drawchat.core.DrawMoment[] {
		let fromIndex = HistoryNumberUtil.getHistoryIndex(this.historyNumbers,from);
		if(fromIndex < 0){
			return [];
		}
		let toIndex = HistoryNumberUtil.getHistoryIndex(this.historyNumbers,to);
		if(toIndex < 0){
			return [];
		}

		let result = [];
		while(fromIndex <= toIndex){
			result.push(this.map[this.historyNumbers[fromIndex]]);
			fromIndex = (fromIndex + 1)|0;
		}
		return result;
	}

	setHistoryNumberNow(
		historyNumber:number
	):number {
		let index = HistoryNumberUtil.getHistoryIndex(this.historyNumbers,historyNumber);
		if(index < 0){
			return index;
		}
		this.historyNumberNow = this.historyNumbers[index];
		this.noticeUpdate();
		return this.historyNumberNow;
	}

	generateMessage():drawchat.Message {
		return DrawMessageBuilder.createDrawMessage(
			this.historyNumbers,
			this.map
		);
	}

	clear():void {
		this.historyNumbers = [];
		this.map = {};
		this.historyNumberNow = -1;
		this.noticeUpdate();
	}

	addLayer(
		layer:drawchat.Layer
	):drawchat.core.DrawMoment {
	    let builder = this.addMoment();
		let layers = this.getLayers(this.historyNumberNow);
		let layerId = this.layerNumberGenerator.getNumber();
		layers.push(layerId);
		builder.setSequence(layers);
		let layerBuilder = builder.putLayerMoment(
			layerId
		);
		layerBuilder.setClip(
			layer.clip
		);
		layerBuilder.setTransForm(
			layer.transform
		);
		layerBuilder.addDraws(
			layer.draws
		);
		layerBuilder.commit();
		return builder.commit();
	}

	removeLayer(
		layerId:string
	):void {
		let layers = this.getLayers(this.historyNumberNow);
		let result = [];
		for(let id of layers){
			if(layerId === id){
				continue;
			}
			result.push(id);
		}
		this.addMoment().setSequence(result).commit();
	}

	addMoment():drawchat.core.DrawMomentBuilder {
		return new MomentBuilder(this);
	}

	awaitUpdate(callback:(historyNumber:number)=>void):void {
		this.listeners.push(callback);
	}

	pushHistory(
		layerMoments?:{[key:string]:DrawLayerMoment},
		sequences?:string[]
	):Moment{
		this.cleanupHistory();
		let num = this.numberGenerator.getNumber();
		let moment = new Moment(num,layerMoments,sequences);
		this.map[num] = moment;
		this.historyNumbers.push(num);
		if(moment.getSequence() != null){
			this.sequencesHistoryNumbers.push(num);
		}
		this.historyNumberNow = num;
		this.noticeUpdate();
		return moment;
	}

	private cleanupHistory(){
		let index = HistoryNumberUtil.getHistoryIndex(this.historyNumbers,this.historyNumberNow);
		if(index >= this.historyNumbers.length){
			return;
		}

		// 全編集履歴の更新
		let deleted = this.historyNumbers.slice(index + 1,this.historyNumbers.length);
		let i = 0 | 0;
		while(i < deleted.length){
			this.map[deleted[i]] = null;
		}
		this.historyNumbers = this.historyNumbers.slice(0,index + 1);

		// sequencesの更新
		index = HistoryNumberUtil.getHistoryIndex(this.sequencesHistoryNumbers,this.historyNumberNow);
		if(index >= this.sequencesHistoryNumbers.length){
			return;
		}
		this.sequencesHistoryNumbers = this.sequencesHistoryNumbers.slice(0,index + 1);
	}
}