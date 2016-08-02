import PathTransaction = drawchat.updater.PathTransaction;
import ColorStop = drawchat.ColorStop;
import Fill = drawchat.Fill;
import Stroke = drawchat.Stroke;
import PathItem = drawchat.PathItem;
import MoveTo = drawchat.MoveTo;
import ArcTo = drawchat.ArcTo;
import QuadraticCurveTo = drawchat.QuadraticCurveTo;
import LineTo = drawchat.LineTo;
import BezierCurveTo = drawchat.BezierCurveTo;
import DrawLayerMomentBuilder = drawchat.core.DrawLayerMomentBuilder;
import Dash = drawchat.Dash;
import StrokeStyle = drawchat.StrokeStyle;
import Graphic = drawchat.Graphic;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import Transform = drawchat.Transform;
import {TransformMap} from "./TransformMap";
import {AbstractLayerTransaction} from "./AbstractLayerTransaction";
import {TransformCalculator} from "./TransformCalculator";
export class Path extends AbstractLayerTransaction implements PathTransaction{

	private fill:Fill;
	private strokeFill:Fill;
	private dash:Dash;
	private style:StrokeStyle;

	private path:PathItem[] = [];

	private transformMap:TransformMap;
	// private transform:Transform;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory,
		layerId:string,
		editLayerId:string,
		transformMap:TransformMap
	){
		super(session,history,layerId,editLayerId);
		this.transformMap = transformMap;
	}

	protected doCommit():void {
		this.doUpdate(this.getLayerBuilder());
	}

	setFill(
		color:string
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);

		this.fill = <Fill>{
			color:color
		};

		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	setFillLinerGradient(
		x0:number,
		y0:number,
		x1:number,
		y1:number,
		colorStops?:ColorStop[]
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point1 = TransformCalculator.transform(invert,x0,y0);
		let point2 = TransformCalculator.transform(invert,x1,y1);

		this.fill = <Fill>{
			linerGradient:{
				x0:point1.x,
				y0:point1.y,
				x1:point2.x,
				y1:point2.y,
				colorStops:colorStops
			}
		};

		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	setFillRadialGradient(
		x0:number,
		y0:number,
		r0:number,
		x1:number,
		y1:number,
		r1:number,
		colorStops?:ColorStop[]
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point1 = TransformCalculator.transform(invert,x0,y0);
		let point2 = TransformCalculator.transform(invert,x1,y1);

		this.fill = <Fill>{
			radialGradient:{
				x0:point1.x,
				y0:point1.y,
				r0:r0,
				x1:point2.x,
				y1:point2.y,
				r1:r1,
				colorStops:colorStops
			}
		};

		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	setStrokeColor(
		color:string
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);

		this.strokeFill = <Fill>{
			color:color
		};

		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	setStrokeDash(
		segments?:number[],
		offset?:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);

		this.dash = {
			segments:segments,
			offset:offset
		};

		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	setStrokeStyle(
		thickness?:number,
		caps?:number,
		joints?:number,
		miterLimit?:number,
		ignoreScale?:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);

		this.style = {
			thickness:thickness,
			caps:caps,
			joints:joints,
			miterLimit:miterLimit,
			ignoreScale:ignoreScale
		};
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	moveTo(
		x:number,
		y:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point = TransformCalculator.transform(invert,x,y);

		this.path.push(
			<MoveTo>{
				type:0,
				x:point.x,
				y:point.y
			}
		);
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	arcTo(
		x1:number,
		y1:number,
		x2:number,
		y2:number,
		radius:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point1 = TransformCalculator.transform(invert,x1,y1);
		let point2 = TransformCalculator.transform(invert,x2,y2);

		this.path.push(
			<ArcTo>{
				type:1,
				x1:point1.x,
				y1:point1.y,
				x2:point2.x,
				y2:point2.y,
				radius:radius
			}
		);
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	lineTo(
		x:number,
		y:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point = TransformCalculator.transform(invert,x,y);

		this.path.push(
			<LineTo>{
				type:3,
				x:point.x,
				y:point.y
			}
		);
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	quadraticCurveTo(
		cpx:number,
		cpy:number,
		x:number,
		y:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point1 = TransformCalculator.transform(invert,cpx,cpy);
		let point2 = TransformCalculator.transform(invert,x,y);

		this.path.push(
			<QuadraticCurveTo>{
				type:2,
				cpx:point1.x,
				cpy:point1.y,
				x:point2.x,
				y:point2.y
			}
		);
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		this.doUpdate(this.getEditBuilder());
		return this;
	}

	bezierCurveTo(
		cpx1:number,
		cpy1:number,
		cpx2:number,
		cpy2:number,
		x:number,
		y:number
	):PathTransaction {
		this.init();

		this.transformMap.updateMap(this.history);
		let transform = this.transformMap.getTransForm(this.layerId);
		let invert = TransformCalculator.invert(transform);
		let point1 = TransformCalculator.transform(invert,cpx1,cpy1);
		let point2 = TransformCalculator.transform(invert,cpx2,cpy2);
		let point3 = TransformCalculator.transform(invert,x,y);

		this.path.push(
			<BezierCurveTo>{
				type:4,
				cpx1:point1.x,
				cpy1:point1.y,
				cpx2:point2.x,
				cpy2:point2.y,
				x:point3.x,
				y:point3.y
			}
		);
		this.doUpdate(this.getEditBuilder().setTransForm(transform));
		return this;
	}

	private doUpdate(layerBuilder:DrawLayerMomentBuilder):void{
		layerBuilder.addDraw(
			<drawchat.GraphicsDraw>{
				graphics:[<Graphic>{
					fill:this.fill,
					stroke:{
						fillStyle:this.strokeFill,
						dash:this.dash,
						style:this.style
					},
					path:this.path
				}]
			})
			.commit().commit();
	}

}
