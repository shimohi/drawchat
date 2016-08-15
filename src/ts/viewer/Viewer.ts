import DrawchatViewer = drawchat.viewer.DrawchatViewer;
import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import DrawHistory = drawchat.core.DrawHistory;
import DrawMoment = drawchat.core.DrawMoment;
import DrawLayerMoment = drawchat.core.DrawLayerMoment;
import Layer = drawchat.Layer;
import NamedLayer = drawchat.viewer.NamedLayer;
import {Backward} from "./Backward";
import {Forward} from "./Forward";
export class Viewer implements DrawchatViewer{

	private history:DrawHistory;
	private renderer:DrawchatRenderer;

	private sequencesNow:string[] = null;

	private now:number;

	constructor(
		history:DrawHistory,
		renderer:DrawchatRenderer
	){
		this.history = history;
		this.renderer = renderer;
		this.now = -1;
	}

	private _start:boolean = false;

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

	start():void{
		this._start = true;
		try {
			this.updateView();
			this.renderer.refresh();
		} catch (e) {
			console.warn(e);
		}
		this.history.awaitUpdate(()=>{
			if(this.start){
				this.start();
			}
		});
	}

	stop():void{
		this._start = false;
	}

	getPixelColor(
		x: number,
		y: number,
		layerIndex:number
	): number[] {
		return this.renderer.getPixelColor(x,y,layerIndex);
	}

	updateView():void{

		let number = this.history.getNowHistoryNumber();
		if(this.now === number){
			return;
		}
		if(!this.history.isAvailable(this.now)){
			this.now = -1;
			this.renderer.clear();
		}

		//過去へ戻る（Undoなど）
		if(this.now > number){
			this.sequencesNow = Backward.updateView(
				this.renderer,
				this.sequencesNow,
				this.history.getLayers(number),
				this.history.getMoments(this.history.getFirstHistoryNumber(),number),
				this.history.getMoments(number + 1,this.now)
			);
			this.now = number;
			return;
		}

		//進む
		this.sequencesNow = Forward.updateView(
			this.renderer,
			this.sequencesNow,
			this.history.getLayers(number),
			this.history.getMoments(this.history.getFirstHistoryNumber(),this.now),
			this.history.getMoments(this.now + 1,number)
		);
		this.now = number;
	}
}
export default Viewer;
