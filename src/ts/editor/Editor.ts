import DrawchatEditor = drawchat.editor.DrawchatEditor;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;
export class Editor implements DrawchatEditor{
	/**
	 * メインキャンバス
	 */
	canvas:DrawchatCanvas;

	/**
	 * 設定値
	 */
	properties:DrawchatEditorProperties;

	/**
	 * モードチェンジャー
	 */
	mode:DrawchatModeChanger;


	commit():void {
	}

	getWidth():number {
		return null;
	}

	getHeight():number {
		return null;
	}

	undo():Promise<any> {
		return null;
	}

	redo():Promise<any> {
		return null;
	}
}
