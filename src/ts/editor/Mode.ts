import DrawchatMode = drawchat.editor.DrawchatMode;
export class Mode implements DrawchatMode{
	/**
	 * 消しゴムツールを示す定数
	 */
	get ERASER_MODE():number{
		return ERASER_MODE;
	}

	/**
	 * 塗りツールを示す定数
	 */
	get FILL_MODE():number{
		return FILL_MODE;
	}

	/**
	 * 線ツールを示す定数
	 */
	get STROKE_MODE():number{
		return STROKE_MODE;
	}

	/**
	 * クリップツールを示す定数
	 */
	get CLIP_MODE():number{
		return CLIP_MODE;
	}

	/**
	 * テキストツールを示す定数
	 */
	get TEXT_MODE():number{
		return TEXT_MODE;
	}

	/**
	 * 変形ツールを示す定数
	 */
	get TRANSFORM_MODE():number{
		return TRANSFORM_MODE;
	}

	/**
	 * スポイトツールを示す定数
	 */
	get EYEDROPPER_MODE():number{
		return EYEDROPPER_MODE;
	}

	private mode:number;

	getMode():number {
		return this.mode;
	}

	changeMode(mode:number):void {
		this.mode = mode;
	}
}

var ERASER_MODE:number = 0;
var FILL_MODE:number = 1;
var STROKE_MODE:number = 2;
var CLIP_MODE:number = 3;
var TEXT_MODE:number = 4;
var TRANSFORM_MODE:number = 5;
var EYEDROPPER_MODE:number = 6;
