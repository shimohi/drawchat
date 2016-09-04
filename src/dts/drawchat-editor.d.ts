declare namespace drawchat.editor {

	interface Color{
		r:number;
		g:number;
		b:number;
	}

	interface DrawchatEditorProperties{

		/**
		 * 線の色
		 */
		color:Color;

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

	interface DrawchatModeChanger{

		/**
		 * モードチェンジ中
		 */
		CHANGING:number;

		/**
		 * 消しゴムツールを示す定数
		 */
		ERASER_MODE:number;

		/**
		 * 塗りツールを示す定数
		 */
		FILL_MODE:number;

		/**
		 * 線ツールを示す定数
		 */
		STROKE_MODE:number;

		/**
		 * クリップツールを示す定数
		 */
		CLIP_MODE:number;

		/**
		 * テキストツールを示す定数
		 */
		TEXT_MODE:number;

		/**
		 * 手のひらツールを示す定数
		 */
		HAND_TOOL_MODE:number;

		/**
		 * スポイトツールを示す定数
		 */
		EYEDROPPER_MODE:number;

		/**
		 * 現在のモードを取得する。
		 */
		getMode():number;

		/**
		 * モード変更
		 */
		changeMode(mode:number):Promise<any>

		isAliveMode(mode:Number):boolean;
	}

	interface DrawchatLayers{

		/**
		 * レイヤー数
		 */
		layerCount():number;

		/**
		 * レイヤー切り替え
		 * @param index
		 */
		setCurrent(index:number):void;

		/**
		 * 現在レイヤー
		 */
		getCurrent():number;

		/**
		 * 指定レイヤーの表示
		 * @param index
		 */
		show(index:number):void;

		/**
		 * 指定レイヤーの非表示
		 * @param index
		 */
		hide(index:number):void;

		/**
		 * レイヤー全非表示
		 */
		hideAll():void;

		/**
		 * レイヤーの全表示
		 */
		showAll():void;

		/**
		 * レイヤーの削除
		 * @param index
		 */
		remove(index:number):Promise<any>;

		/**
		 *  レイヤーの追加
		 */
		addLayer():Promise<any>;

		/**
		 * レイヤーの順序移動
		 * @param index
		 */
		moveTo(index:number):Promise<any>;
	}

	interface DrawchatCanvas{

		/**
		 * MouseDownもしくはTouchStartイベントを通知する。
		 * Canvasの左上を0,0とした座標を設定する。
		 * @param x
		 * @param y
		 */
		touchStart(x:number,y:number):void;

		/**
		 * ドラッグもしくはTouchMoveイベントを通知する。
		 * @param x
		 * @param y
		 */
		touchMove(x:number,y:number):void;

		/**
		 * MouseUpもしくはTouchEndイベントを取得する。
		 * Canvasの左上を0,0とした座標を設定する。
		 * @param x
		 * @param y
		 */
		touchEnd(x:number,y:number):void;

		/**
		 * テキストを設定する。
		 * @param text
		 */
		setText(text:string):void;

		/**
		 * 座標設定の履歴を元に戻す。
		 */
		backward():void;
	}

	interface UpdateListener{
		(): void;
	}

	interface DrawchatEditor{

		// /**
		//  * Canvasの編集を区切る
		//  */
		// commit():void;

		/**
		 * Canvasの幅
		 */
		getWidth():number;

		/**
		 * Canvasの高さ
		 */
		getHeight():number;

		/**
		 * Undo
		 */
		undo():Promise<any>;

		/**
		 * Undoが可能かどうか
		 */
		canUndo():boolean;

		/**
		 * Redo
		 */
		redo():Promise<any>;

		/**
		 * Redoが可能かどうか
		 */
		canRedo():boolean;

		/**
		 * 明示的に再描画する。
		 */
		reRender():void;

		/**
		 * イベント受付、描画を停止する
		 */
		stop():void;

		/**
		 * イベント受付、描画を開始する。
		 */
		start():void;

		/**
		 * メインキャンバス
		 */
		canvas:DrawchatCanvas;

		/**
		 * 設定値
		 */
		properties:DrawchatEditorProperties;

		/**
		 * レイヤー
		 */
		layers:DrawchatLayers;

		/**
		 * モードチェンジャー
		 */
		mode:DrawchatModeChanger;

		/**
		 * 更新通ちを受け取るリスナーを削除する。
		 * @param listener
		 */
		off(listener:UpdateListener):void;

		/**
		 * 更新通知を受け取るリスナーを設定する。
		 * @param listener
		 */
		on(listener:UpdateListener):void;
	}
}

