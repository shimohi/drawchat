import DrawchatEditor = drawchat.editor.DrawchatEditor;
import DrawchatMode = drawchat.editor.DrawchatMode;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
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
	mode:DrawchatMode;

	undo():void {
	}

	redo():void {
	}
}
