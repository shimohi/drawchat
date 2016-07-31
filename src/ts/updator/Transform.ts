import TransformTransaction = drawchat.updator.TransformTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import {AbstractTransaction} from "./AbstractTransaction";
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
	):drawchat.updator.TransformTransaction {
		this.matrix = transform;
		let builder = this.session.addMoment();
		builder.putLayerMoment(this.layerId).setTransForm(this.matrix);
		builder.commit();
		return this;
	}

	protected doCommit():void {
		let builder = this.session.addMoment();
		builder.putLayerMoment(this.layerId).setTransForm(this.matrix);
		builder.commit();
	}
}
