import TransformTransaction = drawchat.updater.TransformTransaction;
import DrawHistory = drawchat.core.DrawHistory;
import DrawHistoryEditSession = drawchat.core.DrawHistoryEditSession;
import DrawTransaction = drawchat.updater.DrawTransaction;
export abstract class AbstractTransaction implements DrawTransaction{

	protected session:DrawHistoryEditSession;
	protected history:DrawHistory;
	protected startPoint:number;
	private savePoint:number;

	constructor(
		session:DrawHistoryEditSession,
		history:DrawHistory
	){
		this.session = session;
		this.startPoint = history.getNowHistoryNumber();
		this.history = history;
	}

	setSavePoint(): void {
		this.savePoint = this.history.getNowHistoryNumber();
	}

	restoreSavePoint(): void {
		this.session.setHistoryNumberNow(this.savePoint);
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

	isAlive(): boolean {
		return this.session.isAlive();
	}

	protected abstract doCommit():void;
}
