import ClipTransaction = drawchat.updator.ClipTransaction;
import PathItem = drawchat.PathItem;
import MoveTo = drawchat.MoveTo;
import ArcTo = drawchat.ArcTo;
import QuadraticCurveTo = drawchat.QuadraticCurveTo;
import LineTo = drawchat.LineTo;
import BezierCurveTo = drawchat.BezierCurveTo;
import Draw = drawchat.Draw;
import DrawLayerMomentBuilder = drawchat.core.DrawLayerMomentBuilder;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;

import {AbstractLayerTransaction} from "./AbstractLayerTransaction";
export class Clip extends AbstractLayerTransaction implements ClipTransaction{

	private path:PathItem[] = [];

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory,
		layerId:string,
		editLayerId:string
	){
		super(session,history,layerId,editLayerId);
	}

	protected doCommit():void {
		this.doUpdate(this.getLayerBuilder());
	}

	moveTo(
		x:number,
		y:number
	):ClipTransaction {
		this.init();
		this.path.push(
			<MoveTo>{
				type:0,
				x:x,
				y:y
			}
		);
		this.doUpdate(this.getEditBuilder());
		return this;
	}

	arcTo(
		x1:number,
		y1:number,
		x2:number,
		y2:number,
		radius:number
	):ClipTransaction {
		this.init();

		this.path.push(
			<ArcTo>{
				type:1,
				x1:x1,
				y1:y1,
				x2:x2,
				y2:y2,
				radius:radius
			}
		);
		this.doUpdate(this.getEditBuilder());
		return this;
	}

	quadraticCurveTo(
		cpx:number,
		cpy:number,
		x:number,
		y:number
	):ClipTransaction {
		this.init();

		this.path.push(
			<QuadraticCurveTo>{
				type:2,
				cpx:cpx,
				cpy:cpy,
				x:x,
				y:y
			}
		);
		this.doUpdate(this.getEditBuilder());
		return this;
	}

	lineTo(
		x:number,
		y:number
	):ClipTransaction {
		this.init();

		this.path.push(
			<LineTo>{
				type:3,
				x:x,
				y:y
			}
		);
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
	):ClipTransaction {
		this.init();

		this.path.push(
			<BezierCurveTo>{
				type:4,
				cpx1:cpx1,
				cpy1:cpy1,
				cpx2:cpx2,
				cpy2:cpy2,
				x:x,
				y:y
			}
		);
		this.doUpdate(this.getEditBuilder());
		return this;
	}

	private doUpdate(layerBuilder:DrawLayerMomentBuilder):void{
		layerBuilder.setClip(
		<drawchat.Clip>{
			path:this.path
		})
		.commit().commit();
	}
}