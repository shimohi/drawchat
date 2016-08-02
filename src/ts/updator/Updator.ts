import DrawchatUpdator = drawchat.updater.DrawchatUpdater;
import DrawHistory = drawchat.core.DrawHistory;
import DrawTransaction = drawchat.updater.DrawTransaction;
import TransformTransaction = drawchat.updater.TransformTransaction;
import ClipTransaction = drawchat.updater.ClipTransaction;
import PathTransaction = drawchat.updater.PathTransaction;
import TextTransaction = drawchat.updater.TextTransaction;
import ChangeSequenceTransaction = drawchat.updater.ChangeSequenceTransaction;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import DrawchatUpdater = drawchat.updater.DrawchatUpdater;

import {Transform} from "./Transform";
import {Clip} from "./Clip";
import {Path} from "./Path";
import {Text} from "./Text";
import {ChangeSequence} from "./ChangeSequence";
import {TransformMap} from "./TransformMap";
export class Updater implements DrawchatUpdater{

	private history:DrawHistory;
	private currentTransaction:DrawTransaction = null;
	private updaterStartPoint:number;
	private editorLayerId:string = null;
	private transformMap:TransformMap = new TransformMap();

	constructor(
		history:DrawHistory,
		editorLayerId?:string
	){
		this.history = history;
		this.editorLayerId = editorLayerId;
	}

	addLayer():Promise<string> {
		return this.before().then((session)=>{
			let moment = session.addLayer({draws:[]},false);
			return moment.getKeys()[0];
		});
	}

	removeLayer(layerId:string):Promise<any> {
		return this.before().then((session)=>{
			session.removeLayer(layerId);
			return null;
		});
	}

	getLayers():string[] {
		return this.history.getLayers(
			this.history.getNowHistoryNumber(),true
		);
	}

	beginTransform(layerId:string,commit:boolean = true):Promise<TransformTransaction> {
		return this.before().then((session)=>{
			let transaction = new Transform(session,this.history,layerId);
			this.currentTransaction = transaction;
			return transaction;
		});
	}

	beginClip(layerId:string,commit:boolean = true):Promise<ClipTransaction> {
		return this.before().then((session)=>{
			let transaction = new Clip(session,this.history,layerId,this.editorLayerId,this.transformMap);
			this.currentTransaction = transaction;
			return transaction;
		});
	}

	beginPath(layerId:string,commit:boolean = true):Promise<PathTransaction> {
		return this.before().then((session)=>{
			let transaction = new Path(session,this.history,layerId,this.editorLayerId,this.transformMap);
			this.currentTransaction = transaction;
			return transaction;
		});
	}

	beginText(layerId:string,commit:boolean = true):Promise<TextTransaction> {
		return this.before().then((session)=>{
			let transaction = new Text(session,this.history,layerId,this.editorLayerId);
			this.currentTransaction = transaction;
			return transaction;
		});
	}

	beginChangeSequence(commit:boolean = true):Promise<ChangeSequenceTransaction> {
		return this.before().then((session)=>{
			let transaction =  new ChangeSequence(session,this.history);
			this.currentTransaction = transaction;
			return transaction;
		});
	}

	canUndo():boolean {
		return this.history.getNowHistoryNumber() > this.history.getFirstHistoryNumber()
			&& this.history.getFirstHistoryNumber() >= 0;
	}

	canRedo():boolean {
		return this.history.getNowHistoryNumber() < this.history.getLastHistoryNumber()
			&& this.history.getLastHistoryNumber() >= 0;
	}

	undo():Promise<any> {
		return this.before(true).then((session)=>{
			let now = this.history.getNowHistoryNumber() | 0;
			if(now <= this.updaterStartPoint){
				return null;
			}
			let numbers = this.history.getHistoryNumbers();
			let i = numbers.length - 1 | 0;
			while(i >= 0){
				if(numbers[i] === now){
					i = (i - 1) |0;
					break;
				}
				i = (i - 1) |0;
			}
			if(i < 0){
				return null;
			}
			session.setHistoryNumberNow(numbers[i]);
			return null;
		});
	}

	redo():Promise<any> {
		return this.before(false).then((session)=>{
			let now = this.history.getNowHistoryNumber() | 0;
			let numbers = this.history.getHistoryNumbers();
			let i = 0 | 0;
			while(i < numbers.length){
				if(numbers[i] === now){
					i = (i + 1) |0;
					break;
				}
				i = (i + 1) |0;
			}
			if(i >= numbers.length){
				return null;
			}
			session.setHistoryNumberNow(numbers[i]);
			return null;
		});
	}

	private before(
		commit:boolean = true
	):Promise<DrawHistoryEditSession>{
		this.cleanTransaction(commit);

		return this.history.lock().then((session)=>{
			if(this.editorLayerId != null){
				return session;
			}
			let moment = session.addLayer({draws:[]},true);
			this.editorLayerId = moment.getKeys()[0];
			this.updaterStartPoint = this.history.getNowHistoryNumber();
			return session;
		});
	}

	private cleanTransaction(
		commit:boolean
	):void{
		if(commit){
			this.currentTransaction.commit();
			return;
		}
		this.currentTransaction.cancel();
	}
}