import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import DrawPathTransaction = drawchat.updater.DrawPathTransaction;
import {EditorProperties} from "./EditorProperties";
import {PathDrawer} from "./PathDrawer";

export class ModeStroke implements DrawchatCanvas {

	private tran:DrawPathTransaction;
	private prop:EditorProperties;
	private pathDrawer:PathDrawer;

	constructor(
		tran:DrawPathTransaction,
		prop:EditorProperties
	){
		this.tran = tran;
		this.tran.setSavePoint();
		this.pathDrawer = new PathDrawer(tran,prop);
		this.lPointX = -100;
		this.lPointY = -100;
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
			this.tran.setSavePoint();
			this.pathDrawer.clear();
			this.doStroke(x,y);
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
		this.doStroke(x,y);
	}

	private setWait():void {
		if (this.waiting) {
			return;
		}
		this.waiting = true;
		setTimeout(()=> {
			if(!this.waiting){
				return;
			}
			this.waiting = false;
			if(!this.tran.isAlive()){
				return;
			}
			let now = new Date().getTime();
			if (now - this.time < 100) {
				this.setWait();
				return;
			}
			this.doStroke(this.wPointX,this.wPointY);
			this.tran.setSavePoint();
			this.pathDrawer.clear();
		}, 100);
	}

	private doStroke(x:number,y:number):void{
		this.waiting = false;
		this.lPointX = x;
		this.lPointY = y;
		this.tran.restoreSavePoint();
		this.tran.setFill(`rgb(${this.prop.color.r},${this.prop.color.g},${this.prop.color.b},${this.prop.alpha})`);
		this.pathDrawer.push(this.lPointX,this.lPointY).doPlot(true);
	}

	setText(text:string):void {
		//処理なし。
	}

	backward():void {
		//処理なし。
	}

	forward():void {
		//処理なし。
	}
}

