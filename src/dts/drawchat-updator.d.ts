declare namespace drawchat.updator {

	interface DrawchatUpdator{

		/**
		 * レイヤーを追加し、追加されたレイヤーのIDを取得する。
		 */
		addLayer():string;

		/**
		 * 指定されたレイヤーを削除する。
		 * @param layerId
		 */
		removeLayer(layerId:string):void;

		/**
		 * レイヤーIDのリストを取得する。
		 */
		getLayers():string[];

		/**
		 * 変形トランザクションを開始する。
		 */
		beginTransform():TransformTransaction;

		/**
		 * 切り抜きトランザクションを開始する。
		 * @param layerId
		 */
		beginClip(layerId:string):ClipTransaction;

		/**
		 * 描画トランザクションを開始する。
		 * @param layerId
		 */
		beginPath(layerId:string):PathTransaction;

		/**
		 * テキストトランザクションを開始する。
		 * @param layerId
		 */
		beginText(layerId:string):TextTransaction;

		/**
		 * 表示順変更トランザクションを開始する。
		 * @param layerId
		 */
		beginChangeSequence(layerId:string):ChangeSequenceTransaction;

		/**
		 * Undoが可能かどうかの判定
		 */
		canUndo():boolean;

		/**
		 * Redoが可能かどうかの判定
		 */
		canRedo():boolean;

		/**
		 * 一つ前の状態に戻す。
		 */
		undo():void;

		/**
		 * 戻した変更を進める。
		 */
		redo():void;
	}

	/**
	 * 変形トランザクション
	 */
	interface TransformTransaction{

		/**
		 * 変形成分を設定
		 * @param transform
		 */
		setMatrix(transform:Transform):TransformTransaction;

		/**
		 * 変更内容をキャンセルする。
		 */
		cancel():TransformTransaction;

		/**
		 * 変更内容を確定する。
		 */
		commit():TransformTransaction;
	}

	/**
	 * 線描画トランザクション
	 */
	interface ClipTransaction{

		/**
		 * 現在の起点を移動する。何もしなければ最初は0,0
		 * @param x
		 * @param y
		 */
		moveTo(
			x:number,
			y:number
		):ClipTransaction;

		/**
		 * 円弧を描画する。
		 * @param x1
		 * @param y1
		 * @param x2
		 * @param y2
		 * @param radius
		 */
		arcTo(
			x1:number,
			y1:number,
			x2:number,
			y2:number,
			radius:number
		):ClipTransaction;

		/**
		 * 直線を描画する。
		 * @param x
		 * @param y
		 */
		lineTo(
			x:number,
			y:number
		):ClipTransaction;

		/**
		 * 2次ベジェ曲線を描画する。
		 * @param cpx
		 * @param cpy
		 * @param x
		 * @param y
		 */
		quadraticCurveTo (
			cpx:number,
			cpy:number,
			x:number,
			y:number
		):ClipTransaction;

		/**
		 * 3次ベジェ曲線を描画する。
		 * @param cpx1
		 * @param cpy1
		 * @param cpx2
		 * @param cpy3
		 * @param x
		 * @param y
		 */
		bezierCurveTo (
			cpx1:number,
			cpy1:number,
			cpx2:number,
			cpy3:number,
			x:number,
			y:number
		):ClipTransaction;

		/**
		 * 変更内容をキャンセルする。
		 */
		cancel():ClipTransaction;

		/**
		 * 変更内容を確定する。
		 */
		commit():ClipTransaction;
	}

	/**
	 * 線描画トランザクション
	 */
	interface PathTransaction {

		/**
		 * 塗りの色を設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param color
		 */
		setFill(
			color:number
		):PathTransaction;

		/**
		 * 線形グラデーションを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param x0
		 * @param y0
		 * @param x1
		 * @param y1
		 * @param colorStops
		 */
		setFillLinerGradient(
			x0:number,
			y0:number,
			x1:number,
			y1:number,
			colorStops?:ColorStop[]
		):PathTransaction;

		/**
		 * 円形グラデーションを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param x0
		 * @param y0
		 * @param r0
		 * @param x1
		 * @param y1
		 * @param r1
		 * @param colorStops
		 */
		setFillRadialGradient(
			x0:number,
			y0:number,
			r0:number,
			x1:number,
			y1:number,
			r1:number,
			colorStops?:ColorStop[]
		):PathTransaction;

		/**
		 * 線の色を設定する。
		 * @param color
		 */
		setStrokeColor(
			color:string
		):PathTransaction;

		/**
		 * 破線を設定。引数がいずれもnullの場合は破線なし。
		 * @param segments
		 * @param offset
		 */
		setStrokeDash(
			segments?:number[],
			offset?:number
		):PathTransaction;

		/**
		 * 線スタイルを設定。
		 * @param thickness 太さ
		 * @param caps 線端の形
		 * @param joints 接点の形
		 * @param miterLimit
		 * @param ignoreScale
		 */
		setStrokeStyle(
			thickness?:number,
			caps?:number,
			joints?:number,
			miterLimit?:number,
			ignoreScale?:number
		):PathTransaction;

		/**
		 * 現在の起点を移動する。何もしなければ最初は0,0
		 * @param x
		 * @param y
		 */
		moveTo(
			x:number,
			y:number
		):PathTransaction;

		/**
		 * 円弧を描画する。
		 * @param x1
		 * @param y1
		 * @param x2
		 * @param y2
		 * @param radius
		 */
		arcTo(
			x1:number,
			y1:number,
			x2:number,
			y2:number,
			radius:number
		):PathTransaction;

		/**
		 * 直線を描画する。
		 * @param x
		 * @param y
		 */
		lineTo(
			x:number,
			y:number
		):PathTransaction;

		/**
		 * 2次ベジェ曲線を描画する。
		 * @param cpx
		 * @param cpy
		 * @param x
		 * @param y
		 */
		quadraticCurveTo (
			cpx:number,
			cpy:number,
			x:number,
			y:number
		):PathTransaction;

		/**
		 * 3次ベジェ曲線を描画する。
		 * @param cpx1
		 * @param cpy1
		 * @param cpx2
		 * @param cpy3
		 * @param x
		 * @param y
		 */
		bezierCurveTo (
			cpx1:number,
			cpy1:number,
			cpx2:number,
			cpy3:number,
			x:number,
			y:number
		):PathTransaction;

		/**
		 * 変更内容をキャンセルする。
		 */
		cancel():PathTransaction;

		/**
		 * 変更内容を確定する。
		 */
		commit():PathTransaction;
	}

	/**
	 * 全面、背面入れ替えのトランザクション
	 */
	interface ChangeSequenceTransaction{

		/**
		 * 指定されたレイヤーを最前面へ移動する。
		 * @param layerId
		 */
		toFirst(layerId:string):ChangeSequenceTransaction;

		/**
		 * 指定されたレイヤーを前面へ移動する。
		 * @param layerId
		 */
		toPrev(layerId:string):ChangeSequenceTransaction;
		/**
		 * 指定されたレイヤーを背面へ移動する。
		 * @param layerId
		 */
		toBack(layerId:string):ChangeSequenceTransaction;
		/**
		 * 指定されたレイヤーを最背面へ移動する。
		 * @param layerId
		 */
		toLast(layerId:string):ChangeSequenceTransaction;
		/**
		 * レイヤーの順序を移動する。
		 * @param layerId
		 * @param index
		 */
		toMove(layerId:string,index:number):ChangeSequenceTransaction;
		/**
		 * 変更内容をキャンセルする。
		 */
		cancel():ChangeSequenceTransaction;
		/**
		 * 変更内容を確定する。
		 */
		commit():ChangeSequenceTransaction;
	}

	/**
	 * テキスト編集トランザクション
	 */
	interface TextTransaction{
		/**
		 * テキストの塗りを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param color
		 */
		setFill(
			color:number
		):TextTransaction;
		/**
		 * テキストの線形グラデーションを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param x0
		 * @param y0
		 * @param x1
		 * @param y1
		 * @param colorStops
		 */
		setFillLinerGradient(
			x0:number,
			y0:number,
			x1:number,
			y1:number,
			colorStops?:ColorStop[]
		):TextTransaction;
		/**
		 * テキストの円形グラデーションを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param x0
		 * @param y0
		 * @param r0
		 * @param x1
		 * @param y1
		 * @param r1
		 * @param colorStops
		 */
		setFillRadialGradient(
			x0:number,
			y0:number,
			r0:number,
			x1:number,
			y1:number,
			r1:number,
			colorStops?:ColorStop[]
		):TextTransaction;
		/**
		 * 線の色を設定する。
		 * @param color
		 */
		setStrokeColor(
			color:string
		):TextTransaction;
		/**
		 * テキストを追加する。
		 * @param text
		 */
		push(
			text:string
		):TextTransaction;
		/**
		 * baselineを設定する。何も設定しなければ通常のベースライン。
		 * @param baseline
		 */
		setBaseline(
			baseline?:string
		):TextTransaction;
		/**
		 * テキストの揃えを設定する。
		 * @param align
		 */
		setAlign(
			align?:string
		):TextTransaction;

		/**
		 * 変更内容をキャンセルする。
		 */
		cancel():TextTransaction;

		/**
		 * 変更内容を確定する。
		 */
		commit():TextTransaction;
	}
}