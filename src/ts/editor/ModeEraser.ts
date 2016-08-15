import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import DrawPathTransaction = drawchat.updater.DrawPathTransaction;
import {EditorProperties} from "./EditorProperties";
import {AbstractModeStroke} from "./AbstractModeStroke";

export class ModeEraser extends AbstractModeStroke<DrawPathTransaction> {

	private prop:EditorProperties;

	constructor(
		tran:DrawPathTransaction,
		prop:EditorProperties
	){
		super(tran,prop);
		this.prop = prop;
	}

	protected setProperty(tran: drawchat.updater.DrawPathTransaction): void {
		tran.setCompositeOperation(6);
		tran.setStrokeColor(`rgb(0,0,0,0)`);
	}

	setText(text:string):void {
		//処理なし。
	}
}

