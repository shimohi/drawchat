import DrawchatLayers = drawchat.editor.DrawchatLayers;
import DrawchatUpdater = drawchat.updater.DrawchatUpdater;
import ChangeSequenceTransaction = drawchat.updater.ChangeSequenceTransaction;
import DrawchatViewer = drawchat.viewer.DrawchatViewer;
export class Layers implements DrawchatLayers{

	updater:DrawchatUpdater;
	viewer:DrawchatViewer;
	currentId:string;

	constructor(
		updater:DrawchatUpdater,
		viewer:DrawchatViewer
	){
		this.updater = updater;
		this.viewer = viewer;
	}

	layerCount():number {
		return this.updater.getLayers().length;
	}

	setCurrent(index:number):void {
		let layers = this.updater.getLayers();
		if(layers == null || layers.length <= index){
			return;
		}
		this.currentId = layers[index];
	}

	getCurrent():number {
		return this.updater.getLayers().findIndex((layerId:string)=>{
			return layerId === this.currentId;
		});
	}

	show(index:number):void {
		this.viewer.show([index]);
	}

	hide(index:number):void {
		this.viewer.hide([index]);
	}

	hideAll():void {
		this.viewer.hide();
	}

	showAll():void {
		this.viewer.show();
	}

	remove(index:number):Promise<any> {
		let layers = this.updater.getLayers();
		if(layers == null || layers.length <= index){
			return Promise.reject(null);
		}
		return this.updater.removeLayer(layers[index]);
	}

	addLayer():Promise<any> {
		return this.updater.addLayer();
	}

	moveTo(index:number):Promise<any> {
		return this.updater.beginChangeSequence().then((tran:ChangeSequenceTransaction)=>{
			tran.toMove(this.currentId,index).commit();
			return null;
		});
	}
}