import {AbstractTransaction} from "./AbstractTransaction";
import TextTransaction = drawchat.updator.TextTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import Fill = drawchat.Fill;
import Stroke = drawchat.Stroke;
import TextDraw = drawchat.TextDraw;
import DrawLayerMomentBuilder = drawchat.core.DrawLayerMomentBuilder;
export abstract class AbstractLayerTransaction extends AbstractTransaction{

	private editLayerId:string;
	private layerId:string;
	private reservedPoint:number;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory,
		layerId:string,
		editLayerId:string
	){
		super(session,history);
		this.layerId = layerId;
		this.editLayerId = editLayerId;
		this.setupEditLayer();
	}

	protected init():void{
		this.session.setHistoryNumberNow(this.reservedPoint);
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
		this.session.addMoment().setSequence(result).commit();
		this.reservedPoint = this.history.getNowHistoryNumber();
	}

	protected getLayerBuilder():DrawLayerMomentBuilder{
		return this.session.addMoment().putLayerMoment(this.layerId);
	}

	protected getEditBuilder():DrawLayerMomentBuilder{
		return this.session.addMoment().putLayerMoment(this.editLayerId);
	}
}
