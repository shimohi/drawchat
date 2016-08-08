import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
export class EditorProperties implements DrawchatEditorProperties{

	/**
	 * 線の色
	 */
	color:string;

	/**
	 * 線の太さ
	 */
	thickness:number;

	/**
	 * フォントサイズ
	 */
	fontSize:number;

	/**
	 * フォントファミリー
	 */
	fontFamily:string;

	/**
	 * フォントの太さ
	 */
	fontWeight:number;

	/**
	 * フォントスタイル
	 */
	fontStyle:string;

	/**
	 * アルファ値
	 */
	alpha:number;

	/**
	 * パスの種別
	 * 0: moveTo
	 * 1: arcTo
	 * 2: quadraticCurveTo
	 * 3: lineTo
	 * 4: bezierCurveTo
	 */
	pathType:number;

}
