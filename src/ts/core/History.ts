import DrawHistory = drawchat.core.DrawHistory;
import DrawMoment = drawchat.core.DrawMoment;
import DrawLayerMoment = drawchat.core.DrawLayerMoment;

import {Moment} from "./Moment";
import {MomentBuilder} from "./MomentBuilder";
import {HistoryNumberGenerator} from "./HistoryNumberGenerator";
import {LayerNumberGenerator} from "./LayerNumberGenerator";
import {DrawMessageBuilder} from "./DrawMessageBuilder";
export class History implements DrawHistory{

	private historyNumberNow:number = - 1;

	private historyNumbers:number[] = [];
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

	private getLayers(historyNumber?:number):string[]{
		let i = (this.historyNumbers.length - 1) | 0;
		if(historyNumber){
			i = this.getHistoryIndex(historyNumber);
		}
		while(i >= 0){
			let moment = this.map[this.historyNumbers[i]];
			if(moment.getSequence()){
				return moment.getSequence();
			}
			i = (i - 1)|0;
		}
		return [];
	}

	private getHistoryIndex(historyNumber:number):number{

		if(historyNumber < 0){
			return -1;
		}

		//	２分木探索で特定
		let min = 0 | 0;
		let max = (this.historyNumbers.length - 1) | 0;
		let index = -1;

		while(max >= min){

			index = min + (((max - min) / 2) | 0);
			let number1 = this.historyNumbers[index];

			if(number1 === historyNumber){
				return index;
			}

			if(number1 > historyNumber){
				max = number1;
				continue;
			}
			min = number1;
		}

		if(index < 0){
			return index;
		}
		if(this.historyNumbers[index] > historyNumber){
			return index - 1;
		}
		return index;
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
		let fromIndex = this.getHistoryIndex(from);
		if(fromIndex < 0){
			return [];
		}
		let toIndex = this.getHistoryIndex(to);
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
		let index = this.getHistoryIndex(historyNumber);
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
		let num = this.numberGenerator.getNumber();
		let moment = new Moment(num,layerMoments,sequences);
		this.map[num] = moment;
		this.historyNumbers.push(num);
		this.historyNumberNow = num;
		this.noticeUpdate();
		return moment;
	}
}