import TransformTransaction = drawchat.updator.TransformTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
export abstract class AbstractTransaction implements AbstractTransaction{

	protected session:DrawHistoryEditSession;
	protected history:DrawHistory;
	protected startPoint:number;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory
	){
		this.session = session;
		this.startPoint = history.getNowHistoryNumber();
		this.history = history;
	}

	cancel():void {
		this.session.setHistoryNumberNow(this.startPoint,true);
		this.session.release();
	}

	commit():void {
		this.session.setHistoryNumberNow(this.startPoint);
		this.doCommit();
		this.session.release();
	}

	protected abstract doCommit():void;
}
