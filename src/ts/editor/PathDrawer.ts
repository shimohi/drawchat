import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import {EditorProperties} from "./EditorProperties";
import {SplinePlotter} from "./SplinePlotter";
import PathTransaction = drawchat.updater.PathTransaction;
export class PathDrawer {

	/**
	 * プロット数が多くなるので、使い回す。
	 */
	private static SPLINE:SplinePlotter;

	private tran:PathTransaction;
	private prop:EditorProperties;

	constructor(
		tran:PathTransaction,
		prop:EditorProperties
	){
		this.tran = tran;
		this.tran.setSavePoint();
		this.prop = prop;
		if(this.tran.isAlive()){
			PathDrawer.SPLINE.inputList.init();
		}
	}

	pushPoint(x:number, y:number):PathDrawer {
		this.checkList();
		PathDrawer.SPLINE.inputList.push(x,y);
		// this.doPlot();
		return this;
	}

	doPlot(x:number = -1,y:number = - 1):PathDrawer{

		this.tran.restoreSavePoint();
		if(PathDrawer.SPLINE.inputList.size() === 0){
			// let result = PathDrawer.SPLINE.resultList;
			this.firstCircle();
			return this;
		}

		if(x >= 0 && y >= 0){
			PathDrawer.SPLINE.inputList.push(x,y);
		}

		PathDrawer.SPLINE.calc();
		let result = PathDrawer.SPLINE.resultList;
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
		if(x >= 0 && y >= 0){
			PathDrawer.SPLINE.inputList.remove(PathDrawer.SPLINE.inputList.size() - 1);
		}
		return this;
	}

	/**
	 * 円弧を描く
	 */
	private firstCircle(){
		let radius = this.prop.thickness ? this.prop.thickness : 1;
		let x = PathDrawer.SPLINE.inputList.item(0).x;
		let y= PathDrawer.SPLINE.inputList.item(0).y;

		this.tran.moveTo(x - radius,y);
		this.tran.arcTo(x - radius, y + radius, x, y + radius, radius);
		this.tran.arcTo(x + radius, y + radius, x + radius, y , radius);
		this.tran.arcTo(x + radius, y - radius, x , y - radius, radius);
		this.tran.arcTo(x - radius, y - radius, x - radius , y, radius);
	}

	/**
	 * リストの大きさを計算してポイントの間引きを実施
	 */
	private checkList():void{
		if(PathDrawer.SPLINE.inputList.size() + 1 === PathDrawer.SPLINE.inputList.max){
			this.cullList();
		}
	}

	/**
	 * リストポイントの間引きを実施
	 */
	private cullList():void{
		let len = PathDrawer.SPLINE.inputList.max;
		let i = len - 1;
		while(i >= 0){
			if( i % 4 === 1){
				PathDrawer.SPLINE.inputList.remove(i);
			}
			i = (i - 1) | 0;
		}
	}
}

