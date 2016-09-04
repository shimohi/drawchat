import TextTransaction = drawchat.updater.TextTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import Fill = drawchat.Fill;
import Stroke = drawchat.Stroke;
import TextDraw = drawchat.TextDraw;
import DrawLayerMomentBuilder = drawchat.core.DrawLayerMomentBuilder;

import {AbstractTransaction} from "./AbstractTransaction";
export abstract class AbstractLayerTransaction extends AbstractTransaction{

	layerId:string;
	private editLayerId:string;
	private reservedPoint:number;
	private initialized:boolean;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory,
		layerId:string,
		editLayerId:string
	){
		super(session,history);
		this.layerId = layerId;
		this.editLayerId = editLayerId;
		this.initialized = false;
	}

	protected init():void{
		if(!this.initialized){
			this.setup(true);
			this.initialized = true;
		}
		this.session.setHistoryNumberNow(this.reservedPoint);
	}

	private setup(editLayer:boolean):void{
		if(editLayer){
			this.setupEditLayer();
		}
		// this.reservedPoint = this.history.getNowHistoryNumber();
		super.setSavePoint();
	}

	/**
	 * 編集用レイヤーをセットアップする。
	 */
	private setupEditLayer():void{

		let layers = this.history.getLayers();
		let i = 0 | 0;
		let result:string[] = [];
		let item:string;
		let addIndex = -1;
		if(layers == null){
			layers = [];
		}

		while(i < layers.length){
			item = layers[i];
			if(item === this.editLayerId){
				//並び替え不要
				if(i === addIndex){
					return;
				}
				i = (i + 1) | 0;
				continue;
			}
			result.push(item);
			i = (i + 1) | 0;

			if(item === this.layerId){
				result.push(this.editLayerId);
				addIndex = i;
			}
		}
		if(result.length === 0){
			result.push(this.editLayerId);
		}

		this.session.addMoment().setSequence(result).commit();
		this.reservedPoint = this.history.getNowHistoryNumber();
	}

	setSavePoint(): void {
		super.setSavePoint();
		this.reservedPoint = this.history.getNowHistoryNumber();
	}

	restoreSavePoint(): void {
		super.restoreSavePoint();
		this.reservedPoint = this.history.getNowHistoryNumber();
	}

	protected beforeCommit(duration:boolean):void {
	}

	protected afterCommit(duration: boolean): void {
		this.setup(duration);
	}

	protected beforeCancel(duration: boolean): void {
		//現在処理なし。
	}

	protected afterCancel(duration: boolean): void {
		//現在処理なし。
	}

	protected getLayerBuilder():DrawLayerMomentBuilder{
		return this.session.addMoment().putLayerMoment(this.layerId);
	}

	protected getEditBuilder():DrawLayerMomentBuilder{
		return this.session.addMoment().putLayerMoment(this.editLayerId);
	}
}
