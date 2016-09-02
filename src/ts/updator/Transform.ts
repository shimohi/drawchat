import TransformTransaction = drawchat.updater.TransformTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import {AbstractTransaction} from "./AbstractTransaction";
import {TransformCalculator} from "./TransformCalculator";
export class Transform extends AbstractTransaction implements TransformTransaction{

	private matrix:drawchat.Transform;
	private layerId:string;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory,
		layerId:string
	){
		super(session,history);
		this.layerId = layerId;
		this.matrix = null;
	}

	setMatrix(
		transform:drawchat.Transform
	):TransformTransaction {
		this.matrix = transform;
		let builder = this.session.addMoment();
		builder.putLayerMoment(this.layerId).setTransForm(this.matrix);
		builder.commit();
		return this;
	}

	translate(tx: number, ty: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.translate(this.matrix,tx,ty));
	}

	scaleX(scaleX: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.scaleX(this.matrix,scaleX));
	}

	scaleY(scaleY: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.scaleY(this.matrix,scaleY));
	}

	scale(scaleX: number, scaleY: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.scale(this.matrix,scaleX,scaleY));
	}

	rotate(transform: drawchat.Transform, rad: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.rotate(this.matrix,rad));
	}

	skewX(transform: drawchat.Transform, radX: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.skewX(this.matrix,radX));
	}

	skewY(transform: drawchat.Transform, radY: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.skewY(this.matrix,radY));
	}

	skew(radX: number, radY: number): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.skew(this.matrix,radX,radY));
	}

	concat(transform: drawchat.Transform): drawchat.updater.TransformTransaction {
		return this.setMatrix(TransformCalculator.concatMatrix(this.matrix,transform));
	}

	protected doCommit():void {
		let builder = this.session.addMoment();
		builder.putLayerMoment(this.layerId).setTransForm(this.matrix);
		builder.commit();
	}

	protected afterCancel(): void {
		this.matrix = null;
	}
}
