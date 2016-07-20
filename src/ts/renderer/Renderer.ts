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
import Fill = drawchat.Fill;
import LinerGradient = drawchat.LinerGradient;
import RadialGradient = drawchat.RadialGradient;
import Stroke = drawchat.Stroke;
class Renderer implements DrawchatRenderer{

	static STROKE_COLOR_DEFAULT:string = "#FFF";
	static FILL_COLOR_DEFAULT:string = "#000";

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
			this.setFill(context,graphics.fill);
		}

		//stroke
		if(graphics.stroke){

		}

		//path
		this.drawPathArray(context,graphics.path);

		//fill
		if(graphics.fill){
			context.fill();
		}

		//stroke
		if(graphics.stroke){
			context.stroke();
		}
	}

	/**
	 * 線スタイルの設定。
	 * @param context
	 * @param stroke
	 */
	private setStroke(
		context:CanvasRenderingContext2D,
		stroke:Stroke
	):void{

		//	塗りスタイル
		this.setStrokeFill(context,stroke.fillStyle);

		//	破線( offsetは未対応)
		if(stroke.dash && stroke.dash.segments){
			context.setLineDash(stroke.dash.segments);
		}else{
			context.setLineDash([]);
		}

		//
		let style = stroke.style;
		if(!style){
			context.lineWidth = 1;
			context.lineCap = "butt";
			context.lineJoin = "miter";
			context.miterLimit =  10.0;
			return;
		}

		//	太さ
		if(style.thickness){
			context.lineWidth = style.thickness;
		}else{
			context.lineWidth = 1;
		}

		//	lineCap
		if(style.caps){
			context.lineCap = style.caps;
		}else{
			context.lineCap = "butt";
		}

		//	miter

		//	miterLimit
	}

	/**
	 * 線スタイルの設定。
	 * @param context
	 * @param fill
	 */
	private setStrokeFill(
		context:CanvasRenderingContext2D,
		fill?:Fill
	):void{

		//	指定なし（デフォルト）
		if(!fill){
			context.strokeStyle = Renderer.STROKE_COLOR_DEFAULT;
			return;
		}

		//	ベタ塗り
		if(fill.color){
			context.strokeStyle = fill.color;
			return;
		}

		//	線形グラデーション
		if(fill.linerGradient){
			context.strokeStyle = this.createLineGradient(context,fill.linerGradient);
			return;
		}

		//	円形グラデーション
		if(fill.radialGradient){
			context.strokeStyle = this.createRadialGradient(context,fill.radialGradient);
			return;
		}
		context.strokeStyle = Renderer.STROKE_COLOR_DEFAULT;
	}

	/**
	 * 塗りスタイルの設定。
	 * @param context
	 * @param fill
	 */
	private setFill(
		context:CanvasRenderingContext2D,
		fill:Fill
	):void{

		//	ベタ塗り
		if(fill.color){
			context.fillStyle = fill.color;
			return;
		}

		//	線形グラデーション
		if(fill.linerGradient){
			context.fillStyle = this.createLineGradient(context,fill.linerGradient);
			return;
		}

		if(fill.radialGradient){
			context.fillStyle = this.createRadialGradient(context,fill.radialGradient);
		}
		fill.color =  Renderer.FILL_COLOR_DEFAULT;
	}

	/**
	 * 線形グラデーションの構築。
	 * @param context
	 * @param linerGradient
	 * @returns {CanvasGradient}
	 */
	private createLineGradient(
		context:CanvasRenderingContext2D,
		linerGradient:LinerGradient
	):CanvasGradient{
		let liner = context.createLinearGradient(
			linerGradient.x0,
			linerGradient.y0,
			linerGradient.x1,
			linerGradient.y1
		);
		if(!linerGradient.colorStops){
			return liner;
		}
		for(let stop of linerGradient.colorStops){
			liner.addColorStop(stop.offset,stop.color);
		}
		return liner;
	}

	/**
	 * 線形グラデーションの構築。
	 * @param context
	 * @param radialGradient
	 * @returns {CanvasGradient}
	 */
	private createRadialGradient(
		context:CanvasRenderingContext2D,
		radialGradient:RadialGradient
	):CanvasGradient{
		let radial = context.createRadialGradient(
			radialGradient.x0,
			radialGradient.y0,
			radialGradient.r0,
			radialGradient.x1,
			radialGradient.y1,
			radialGradient.r1
		);
		if(!radialGradient.colorStops){
			return radial;
		}
		for(let stop of radialGradient.colorStops){
			radial.addColorStop(stop.offset,stop.color);
		}
		return radial;
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