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
		this.savePoint = this.startPoint;
		this.history = history;
	}

	setSavePoint(): void {
		this.savePoint = this.history.getNowHistoryNumber();
	}

	restoreSavePoint(): void {
		this.session.setHistoryNumberNow(this.savePoint);
	}

	cancel(duration: boolean = false): void {
		this.session.setHistoryNumberNow(this.startPoint,true);
		if(!duration){
			this.session.release();
			return;
		}
	}

	commit(duration: boolean = false): void {
		this.restoreSavePoint();
		// this.session.setHistoryNumberNow(this.startPoint);
		this.doCommit();
		if(!duration){
			this.session.release();
			return;
		}
		this.startPoint = this.history.getNowHistoryNumber();
	}

	isAlive(): boolean {
		return this.session.isAlive();
	}

	protected abstract doCommit():void;
}
