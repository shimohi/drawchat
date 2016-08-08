import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import {EditorProperties} from "./EditorProperties";
import {PathDrawer} from "./PathDrawer";
export class ModeClip implements DrawchatCanvas {

	private tran:ClipTransaction;
	private prop:EditorProperties;
	private pathDrawer:PathDrawer;

	constructor(
		tran:ClipTransaction,
		prop:EditorProperties
	){
		this.pathDrawer = new PathDrawer(tran,prop);
	}

	private time:number;

	lPointX:number;
	lPointY:number;

	private wPointX:number;
	private wPointY:number;
	private waiting:boolean;

	setPoint(x:number, y:number):void {
		if(!this.tran.isAlive()){
			return;
		}
		let latest = this.time;
		this.time = new Date().getTime();

		if((this.time - latest) >= 50){
			this.pathDrawer.pushPoint(x,y).doPlot();
			this.lPointX = x;
			this.lPointY = y;
			return;
		}

		let x1 = x - this.lPointX;
		let y1 = y - this.lPointY;

		let d = Math.sqrt(x1 * x1 + y1 * y1);
		if(d < 5){
			this.wPointX = x;
			this.wPointY = y;
			this.setWait();
			return;
		}
		this.lPointX = x;
		this.lPointY = y;
		this.pathDrawer.pushPoint(x,y).doPlot();
	}

	private setWait():void {
		if (this.waiting) {
			return;
		}
		this.waiting = true;
		setTimeout(()=> {
			this.waiting = false;
			if(!this.tran.isAlive()){
				return;
			}
			let now = new Date().getTime();
			if (now - this.time < 100) {
				this.setWait();
				return;
			}
			this.pathDrawer.pushPoint(this.lPointX,this.lPointY).doPlot();
		}, 100);
	}

	setText(text:string):void {
		//処理なし。
	}

	backward():void {
	}

	forward():void {
	}
}

