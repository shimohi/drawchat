import ChangeSequenceTransaction = drawchat.updator.ChangeSequenceTransaction;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import DrawHistory = drawchat.core.DrawHistory;

import {AbstractTransaction} from "./AbstractTransaction";
export class ChangeSequence extends AbstractTransaction implements ChangeSequenceTransaction{

	private sequences:string[];

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory
	){
		super(session,history);
		this.sequences = history.getLayers(history.getNowHistoryNumber(),false);
	}

	protected doCommit():void {
		this.session.addMoment().setSequence(this.sequences).commit();
	}

	toFirst(layerId:string):drawchat.updator.ChangeSequenceTransaction {
		let result:string[] = [];
		result.push(layerId);
		if(!this.filterUnMatch(result,layerId)){
			return this;
		}
		return this.doUpdate(result);
	}

	toPrev(layerId:string):drawchat.updator.ChangeSequenceTransaction {
		let i = this.findIndex(layerId)| 0;
		if( i <= 0){
			return this;
		}
		let item = this.sequences[i];
		this.sequences[i] = this.sequences[(i - 1)|0];
		this.sequences[(i -1)|0] = item;
		return this.doUpdate(this.sequences);
	}

	toBack(layerId:string):drawchat.updator.ChangeSequenceTransaction {
		let i = this.findIndex(layerId)| 0;
		if( i >= this.sequences.length - 1 || i < 0){
			return this;
		}
		let item = this.sequences[i];
		this.sequences[i] = this.sequences[(i + 1)|0];
		this.sequences[(i + 1)|0] = item;
		return this.doUpdate(this.sequences);
	}

	toLast(layerId:string):drawchat.updator.ChangeSequenceTransaction {
		let result:string[] = [];
		if(!this.filterUnMatch(result,layerId)){
			return this;
		}
		result.push(layerId);
		return this.doUpdate(result);
	}

	toMove(layerId:string, index:number):drawchat.updator.ChangeSequenceTransaction {
		if(this.sequences.length  <= index || index < 0){
			return this;
		}
		let i = 0 | 0;
		let has = false;
		let result:string[] = [];
		while(i < this.sequences.length){
			if(this.sequences[i] === layerId){
				i = (i + 1) | 0;
				has = true;
				continue;
			}
			if(has){
				result.push(this.sequences[i]);
			}
			if(i === index){
				result.push(layerId);
			}
			if(!has){
				result.push(this.sequences[i]);
			}
			i = (i + 1) | 0;
		}
		if(!has){
			return this;
		}
		return this.doUpdate(result);
	}

	private doUpdate(result:string[]):ChangeSequenceTransaction{
		this.session.addMoment().setSequence(result).commit();
		this.sequences = result;
		return this;
	}

	private filterUnMatch(resultTo:string[],layerId:string):boolean{
		let has = false;
		let i = 0 | 0;
		while(i < this.sequences.length){
			if(this.sequences[i] !== layerId){
				resultTo.push(this.sequences[i]);
			}else{
				has = true;
			}
			i = (i + 1) | 0;
		}
		return has;
	}

	private findIndex(layerId:string):number{
		let i = 0 | 0;
		while(i < this.sequences.length){
			if(this.sequences[i] === layerId){
				return i;
			}
		}
		return -1;
	}
}