import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {CanvasContainer} from "./CanvasContainer";
import PathItem = drawchat.PathItem;
import MoveTo = drawchat.MoveTo;
import ArcTo = drawchat.ArcTo;
import QuadraticCurveTo = drawchat.QuadraticCurveTo;
import LineTo = drawchat.LineTo;
import BezierCurveTo = drawchat.BezierCurveTo;
import Transform = drawchat.Transform;
import GraphicsDraw = drawchat.GraphicsDraw;
import Graphic = drawchat.Graphic;
class Renderer implements DrawchatRenderer{


	private canvasContainer:CanvasContainer;
	// private canvas:CanvasRenderingContext2D;


	size():number {
		return this.canvasContainer.getSize();
	}

	sortLayer(orders:number[]):void {
		this.canvasContainer.sortCanvas(orders);
	}

	removeLayer(index:number):void {
		this.canvasContainer.removeCanvas(index);
	}

	addLayer():number {
		return this.canvasContainer.addCanvas();
	}

	render(
		index:number,
		draws:drawchat.Draw[],
		transform?:drawchat.Transform,
		clip?:drawchat.Clip
	):void {

		let context = this.canvasContainer.getCanvas(index);
		if(!context){
			return;
		}

		//	切り抜きの設定
		if(clip){
			this.setTransform(
				context,
				clip.transform ? clip.transform : transform
			);
			this.drawPathArray(context,clip.path);
			context.clip();
		}

		if(transform){
			context.setTransform(
				transform.a,
				transform.b,
				transform.c,
				transform.d,
				transform.x,
				transform.y
			);
		}

		context.beginPath();
		//clip.path
	}

	private renderGraphics(
		context:CanvasRenderingContext2D,
		graphics:GraphicsDraw
	):void{

	}

	private renderGraphics(
		context:CanvasRenderingContext2D,
		graphics:Graphic
	):void{

		//fill
		if(graphics.fill){


		}

		//stroke
		if(graphics.stroke){

		}


		//path
		if(graphics.path){

		}



		graphics.fill




	}


	private setTransform(
		context:CanvasRenderingContext2D,
		transform?:Transform
	){
		if(!transform){
			return;
		}
		context.setTransform(
			transform.a,
			transform.b,
			transform.c,
			transform.d,
			transform.x,
			transform.y
		);
	}

	private drawPathArray(
		context:CanvasRenderingContext2D,
		items:PathItem[]
	):void{

		if(!items || items.length === 0){
			return;
		}

		context.beginPath();
		for(let item of items){
			this.drawPath(context,item);
		}
		context.closePath();
	}

	private drawPath(
		context:CanvasRenderingContext2D,
		item:PathItem
	):void{

		switch(item.type){

			//moveTo
			case 0:
				let moveTo = (<MoveTo>item);
				context.moveTo(
					moveTo.x,
					moveTo.y
				);
				break;

			//arcTo
			case 1:
				let arcTo = (<ArcTo>item);
				context.arcTo(
					arcTo.x1,
					arcTo.y1,
					arcTo.x2,
					arcTo.y2,
					arcTo.radius
				);
				break;

			//quadraticCurveTo
			case 2:
				let qCurveTo = (<QuadraticCurveTo>item);
				context.quadraticCurveTo(
					qCurveTo.cpx,
					qCurveTo.cpy,
					qCurveTo.x,
					qCurveTo.y
				);
				break;

			//lineTo
			case 3:
				let lineTo = (<LineTo>item);
				context.lineTo(lineTo.x,lineTo.y);
				break;

			//bezierCurveTo
			case 4:
				let bCurveTo = (<BezierCurveTo>item);
				context.bezierCurveTo(
					bCurveTo.cpx1,
					bCurveTo.cpy1,
					bCurveTo.cpx2,
					bCurveTo.cpy2,
					bCurveTo.x,
					bCurveTo.y
				);
				break;
		}
	}

	renderDiff(
		index:number,
		draws:drawchat.Draw[]
	):void {

	}

	refresh():void {
		//何もせず
	}

	clear():void {
		this.canvasContainer.clear();
	}

	createImageDataURL():string {
		return null;
	}

	show(target?:number[]):void {
		for(let canvas of this.getCanvasList(target)){
			canvas.globalAlpha = 1.0;
		}
	}

	hide(target?:number[]):void {
		for(let canvas of this.getCanvasList(target)){
			canvas.globalAlpha = 0.0;
		}
	}

	private getCanvasList(targets?:number[]):CanvasRenderingContext2D[]{
		let result = [];
		if(!targets){
			return this.getCanvasAll();
		}
		for(let target of targets){
			result.push(this.canvasContainer.getCanvas(target));
		}
		return result;
	}

	private getCanvasAll():CanvasRenderingContext2D[]{
		let result = [];
		let size = this.canvasContainer.getSize();
		let i = 0|0;
		while(i < size){
			result.push(this.canvasContainer.getCanvas(i));
			i = (i + 1)|0;
		}
		return result;
	}
}