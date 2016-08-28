import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import PathItem = drawchat.PathItem;
import MoveTo = drawchat.MoveTo;
import ArcTo = drawchat.ArcTo;
import QuadraticCurveTo = drawchat.QuadraticCurveTo;
import LineTo = drawchat.LineTo;
import BezierCurveTo = drawchat.BezierCurveTo;
import Transform = drawchat.Transform;
import GraphicsDraw = drawchat.GraphicsDraw;
import Graphic = drawchat.Graphic;
import Fill = drawchat.Fill;
import LinerGradient = drawchat.LinerGradient;
import RadialGradient = drawchat.RadialGradient;
import Stroke = drawchat.Stroke;
import TextDraw = drawchat.TextDraw;

import {CanvasContainer} from "./CanvasContainer";
import {TransformContainer} from "./TransformContainer";
import {ClipUtil} from "./ClipUtil";
import {GraphicsUtil} from "./GraphicsUtil";
import {TextUtil} from "./TextUtil";
import DOMRendererFactory = drawchat.renderer.DOMRendererFactory;

class Renderer implements DrawchatRenderer{

	private canvasContainer:CanvasContainer;
	private transformContainer:TransformContainer = new TransformContainer();

	constructor(
		parent:Element|string,
		width?:number,
		height?:number
	){
		this.canvasContainer = new CanvasContainer(
			parent,width,height
		);
	}

	get width():number{
		return this.canvasContainer.width;
	}

	get height():number{
		return this.canvasContainer.height;
	}

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

		if(!draws || draws.length === 0){
			return;
		}
		let context = this.canvasContainer.getCanvas(index);
		if(!context){
			return;
		}

		context.clearRect(0,0,this.canvasContainer.width,this.canvasContainer.height);
		this.transformContainer.setBaseTransform(transform);

		//	切り抜きの設定
		ClipUtil.setClip(context,this.transformContainer,clip);

		this.renderDraw(context,draws);
	}

	renderDiff(
		index:number,
		draws:drawchat.Draw[]
	):void {
		if(!draws || draws.length === 0){
			return;
		}
		let context = this.canvasContainer.getCanvas(index);
		if(!context){
			return;
		}
		this.renderDraw(context,draws);
	}

	refresh():void {
		//何もせず
	}

	clear():void {
		this.canvasContainer.clear();
	}

	createImageDataURI():string {
		return this.canvasContainer.combineDataImage();
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

	getPixelColor(x: number, y: number, layerIndex: number): number[] {
		let canvas = this.canvasContainer.getCanvas(layerIndex);
		let data:ImageData = canvas.getImageData(x,y,1,1);
		return [data.data[0],data.data[1],data.data[2],data.data[3]];
	}

	private renderDraw(
		context:CanvasRenderingContext2D,
		draws:drawchat.Draw[]
	):void{
		let i = 0|0;
		while(i < draws.length){
			let draw = draws[i];

			//	パス描画
			if((<GraphicsDraw>draw).graphics){
				GraphicsUtil.renderGraphics(context,this.transformContainer,(<GraphicsDraw>draw));
				i = (i + 1)|0;
				continue;
			}

			//	テキスト描画
			TextUtil.renderTextDraw(context,this.transformContainer,<TextDraw>draw);
			i = (i + 1)|0;
		}
	}

	private getCanvasList(targets?:number[]):CanvasRenderingContext2D[]{
		let result:CanvasRenderingContext2D[] = [];
		if(!targets){
			return this.getCanvasAll();
		}
		for(let target of targets){
			result.push(this.canvasContainer.getCanvas(target));
		}
		return result;
	}

	private getCanvasAll():CanvasRenderingContext2D[]{
		let result:CanvasRenderingContext2D[] = [];
		let size = this.canvasContainer.getSize();
		let i = 0|0;
		while(i < size){
			result.push(this.canvasContainer.getCanvas(i));
			i = (i + 1)|0;
		}
		return result;
	}
}

export class Factory implements DOMRendererFactory{
	createInstance(
		parent:Element|string,
		width?:number,
		height?:number
	):DrawchatRenderer{
		return new Renderer(parent,width,height);
	}
}
export var MultiCanvas2DRenderer:DOMRendererFactory = new Factory();
export default MultiCanvas2DRenderer;