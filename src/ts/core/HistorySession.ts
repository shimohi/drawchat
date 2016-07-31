import DrawHistory = drawchat.core.DrawHistory;
import DrawMoment = drawchat.core.DrawMoment;
import DrawLayerMoment = drawchat.core.DrawLayerMoment;

import {Moment} from "./Moment";
import {MomentBuilder} from "./MomentBuilder";
import {HistoryNumberGenerator} from "./HistoryNumberGenerator";
import {LayerNumberGenerator} from "./LayerNumberGenerator";
import {DrawMessageBuilder} from "./DrawMessageBuilder";
import {HistoryNumberUtil} from "./HistoryNumberUtil";
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import {HistoryProperty} from "./HistoryProperty";
import {SessionQueue} from "./SessionQueue";

export class HistorySession implements DrawHistoryEditSession{

	alive:boolean = false;

	private prop:HistoryProperty;

	private queue:SessionQueue;

	constructor(
		queue:SessionQueue,
		historyProperty:HistoryProperty
	){
		this.prop = historyProperty;
		this.queue = queue;
	}

	setHistoryNumberNow(
		historyNumber:number,
		clearFuture:boolean = false
	):number {
		if(!this.alive){
			this.noticeSessionError();
			return;
		}
		let index = HistoryNumberUtil.getHistoryIndex(
			this.prop.historyNumbers,historyNumber
		);
		if(index < 0){
			return index;
		}
		this.prop.historyNumberNow = this.prop.historyNumbers[index];
		if(clearFuture){
			this.cleanupHistory();
		}
		this.noticeUpdate();
		return this.prop.historyNumberNow;
	}

	clear():void {
		if(!this.alive){
			this.noticeSessionError();
			return;
		}
		this.prop.historyNumbers = [];
		this.prop.map = {};
		this.prop.historyNumberNow = -1;
		this.noticeUpdate();
	}

	addLayer(
		layer:drawchat.Layer,
		isLocal?:boolean
	):drawchat.core.DrawMoment {
		if(!this.alive){
			this.noticeSessionError();
			return;
		}
	    let builder = this.addMoment();
		let layers = this.prop.getLayers(this.prop.historyNumberNow);
		let layerId = this.prop.layerNumberGenerator.getNumber();
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
		this.prop.localLayers[layerId] = layerId;
		return builder.commit();
	}

	removeLayer(
		layerId:string
	):void {
		if(!this.alive){
			this.noticeSessionError();
			return;
		}
		let layers = this.prop.getLayers(this.prop.historyNumberNow);
		let result:string[] = [];
		for(let id of layers){
			if(layerId === id){
				continue;
			}
			result.push(id);
		}
		this.addMoment().setSequence(result).commit();
	}

	addMoment():drawchat.core.DrawMomentBuilder {
		if(!this.alive){
			this.noticeSessionError();
			return;
		}
		return new MomentBuilder(this);
	}

	/**
	 * MomentBuilderから変更内容を受け取るメソッド。
	 * @param layerMoments
	 * @param sequences
	 * @returns {Moment}
	 */
	pushHistory(
		layerMoments?:{[key:string]:DrawLayerMoment},
		sequences?:string[]
	):Moment{
		this.cleanupHistory();
		let num = this.prop.numberGenerator.getNumber();
		let moment = new Moment(num,layerMoments,sequences);
		this.prop.map[num] = moment;
		this.prop.historyNumbers.push(num);
		if(moment.getSequence() != null){
			this.prop.sequencesHistoryNumbers.push(num);
		}
		this.prop.historyNumberNow = num;
		this.noticeUpdate();
		return moment;
	}

	/**
	 * 編集セッション切れ通知
 	 */
	private noticeSessionError():void{
		//とりあえずエラーメッセージのみ
		console.log('This session is not alive.');
	}

	/**
	 * リスナーに更新を通知する。
	 */
	private noticeUpdate():void{
		let len = (this.prop.listeners.length) | 0;
		let i = 0;
		while(i < len){
			this.prop.listeners[i](this.prop.historyNumberNow);
			i = (i + 1) | 0;
		}
		this.prop.listeners = [];
	}

	/**
	 * 現在の履歴番号よりも後の履歴を削除する。
	 */
	private cleanupHistory(){
		let index = HistoryNumberUtil.getHistoryIndex(
			this.prop.historyNumbers,this.prop.historyNumberNow
		);
		if(index >= this.prop.historyNumbers.length){
			return;
		}

		// 全編集履歴の更新
		let deleted = this.prop.historyNumbers.slice(
			index + 1,this.prop.historyNumbers.length
		);
		let i = 0 | 0;
		while(i < deleted.length){
			this.prop.map[deleted[i]] = null;
		}
		this.prop.historyNumbers = this.prop.historyNumbers.slice(0,index + 1);

		// sequencesの更新
		index = HistoryNumberUtil.getHistoryIndex(
			this.prop.sequencesHistoryNumbers,this.prop.historyNumberNow
		);
		if(index >= this.prop.sequencesHistoryNumbers.length){
			return;
		}
		this.prop.sequencesHistoryNumbers
			= this.prop.sequencesHistoryNumbers.slice(0,index + 1);
	}

	release():void {
		if(this.alive){
			this.queue.dequeue();
		}
	}
}