import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import {EditorProperties} from "./EditorProperties";
import {AbstractModeFill} from "./AbstractModeFill";
export class ModeClip extends AbstractModeFill<ClipTransaction>{

	private prop:EditorProperties;
	constructor(
		tran:ClipTransaction,
		prop:EditorProperties
	){
		super(tran,prop);
		this.prop = prop;
	}

	protected setProperty(tran: drawchat.updater.ClipTransaction): void {
		//処理なし。
	}

	setText(text:string):void {
		//処理なし。
	}
}

