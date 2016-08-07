import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import {EditorProperties} from "./EditorProperties";
import {PointList} from "./PointArray";
import {SplinePlotter} from "./SplinePlotter";
export class ModeClip implements DrawchatCanvas {

	private tran:ClipTransaction;
	private prop:EditorProperties;
	private spline:SplinePlotter;

	constructor(
		tran:ClipTransaction,
		prop:EditorProperties,
		spline:SplinePlotter
	){
		this.tran = tran;
		this.prop = prop;
		this.spline = spline;
		this.spline.inputList.init();
		this.time = -1;
	}

	private time:number;

	private wPointX:number;
	private wPointY:number;
	private waiting:boolean;

	setPoint(x:number, y:number):void {
		this.checkList();

		let latest = this.time;
		this.time = new Date().getTime();
		if(this.spline.inputList.size() === 0 ){
			this.spline.inputList.push(x,y);
			return;
		}

		if((this.time - latest) >= 50){
			this.spline.inputList.push(x,y);
			this.doPlot();
			return;
		}

		let lastPoint = this.spline.inputList.item(
			this.spline.inputList.size() - 1
		);

		let x1 = x - lastPoint.x;
		let y1 = y - lastPoint.y;

		let d = Math.sqrt(x1 * x1 + y1 * y1);
		if(d < 5){
			this.wPointX = x;
			this.wPointY = y;
			this.setWait();
			return;
		}

		this.spline.inputList.push(x,y);
		this.doPlot();
	}

	private setWait():void {
		if (this.waiting) {
			return;
		}
		this.waiting = true;
		setTimeout(()=> {
			this.waiting = false;

			let now = new Date().getTime();
			if (now - this.time < 100) {
				this.setWait();
				return;
			}
			this.spline.inputList.push(this.wPointX, this.wPointY);
			this.doPlot();
		}, 100);
	}

	private doPlot(){
		this.spline.calc();
		let result = this.spline.resultList;
		if(result.size() === 0){
			return;
		}
		this.tran.moveTo(
			result.item(0).x,
			result.item(0).y
		);

		let i = 1 | 0;
		while(i < result.size()){
			this.tran.lineTo(
				result.item(1).x,
				result.item(1).y
			);
			i = (i + 1) | 0;
		}
	}

	/**
	 * リストの大きさを計算してポイントの間引きを実施
	 */
	private checkList(){
		if(this.spline.inputList.size() === this.spline.inputList.max){
			this.cullList();
		}
	}

	/**
	 * リストポイントの間引きを実施
	 */
	private cullList(){
		let len = this.spline.inputList.max;
		let i = len - 1;
		while(i >= 0){
			if( i % 4 === 1){
				this.spline.inputList.remove(i);
			}
			i = (i - 1) | 0;
		}
	}

	setText(text:string):void {
		//処理なし。
	}

	backward():void {
	}

	forward():void {
	}
}

