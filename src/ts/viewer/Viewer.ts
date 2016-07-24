import DrawchatViewer = drawchat.viewer.DrawchatViewer;
import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import DrawHistory = drawchat.core.DrawHistory;
import DrawMoment = drawchat.core.DrawMoment;
import DrawLayerMoment = drawchat.core.DrawLayerMoment;
import Layer = drawchat.Layer;
import {LayerMoment} from "../core/LayerMoment";
import {MapMomentUtil} from "./MapMomentUtil";
import NamedLayer = drawchat.viewer.NamedLayer;
export class Viewer implements DrawchatViewer{

	private history:DrawHistory;
	private renderer:DrawchatRenderer;

	private sequencesNow:string[];

	private now:number;

	clear():void {
		this.renderer.clear();
	}

	createImageDataURI():string {
		return this.renderer.createImageDataURI();
	}

	show(target?:number[]):void {
		this.show(target);
	}

	hide(target?:number[]):void {
		this.hide(target);
	}

	private updateView():void{

		let number = this.history.getNowHistoryNumber();

		if(this.now === number){
			return;
		}
		let moments = this.history.getMoments(this.now,number);
		let layers =  MapMomentUtil.mapMoments(moments,this.sequencesNow);
		let layerIds = [];
		for(let layer of layers){
			layerIds.push(layer.layerId);
		}

		let updateStateMap = Viewer.checkState(
			this.sequencesNow,
			layers
		);

		//通常の更新
		if(this.now < number){

			//レイヤーの補完
			this.complementLayer(this.sequencesNow,updateStateMap);

			//表示順の変更
			this.renderer.sortLayer(this.createSortOrder(this.sequencesNow,layerIds));

			//更新の反映

			return;
		}

		//Undo
	}

}
