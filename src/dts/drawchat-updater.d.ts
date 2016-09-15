declare namespace drawchat.updater {

	interface DrawchatUpdater{

		/**
		 * レイヤーを追加し、追加されたレイヤーのIDを取得する。
		 */
		addLayer():Promise<string>;

		/**
		 * 指定されたレイヤーを削除する。
		 * @param layerId
		 */
		removeLayer(layerId:string):Promise<any>;

		/**
		 * レイヤーIDのリストを取得する。
		 */
		getLayers():string[];

		/**
		 * 変形トランザクションを開始する。
		 * @param layerId
		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
		 * デフォルト値はtrue
		 */
		beginTransform(layerId:string,commit?:boolean):Promise<TransformTransaction>;

		/**
		 * 切り抜きトランザクションを開始する。
		 * @param layerId
		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
		 * デフォルト値はtrue
		 */
		beginClip(layerId:string,commit?:boolean):Promise<ClipTransaction>;

		/**
		 * 描画トランザクションを開始する。
		 * @param layerId
		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
		 * デフォルト値はtrue
		 */
		beginPath(layerId:string,commit?:boolean):Promise<DrawPathTransaction>;

		/**
		 * テキストトランザクションを開始する。
		 * @param layerId
		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
		 * デフォルト値はtrue
		 */
		beginText(layerId:string,commit?:boolean):Promise<TextTransaction>;

		/**
		 * 表示順変更トランザクションを開始する。
		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
		 * デフォルト値はtrue
		 */
		beginChangeSequence(commit?:boolean):Promise<ChangeSequenceTransaction>;

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
		undo():Promise<any>;

		/**
		 * 戻した変更を進める。
		 */
		redo():Promise<any>;
	}

	/**
	 * トランザクション
	 */
	interface DrawTransaction{

		/**
		 * トランザクションが有効かどうか
		 */
		isAlive():boolean;

		/**
		 * 変更内容をキャンセルする。
		 */
		cancel(duration?:boolean):void;

		/**
		 * 変更内容を確定する。
		 */
		commit(duration?:boolean):void;

		/**
		 * 直前までの変更を履歴に反映する。
		 */
		flush():void;

		/**
		 * savePointを設定する。
		 */
		setSavePoint():void;

		/**
		 * savePointに戻す。
		 */
		restoreSavePoint():void;
	}

	/**
	 * 変形トランザクション
	 */
	interface TransformTransaction extends DrawTransaction{

		/**
		 * 変形成分を設定
		 * @param transform
		 */
		setMatrix(transform:Transform):TransformTransaction;

		/**
		 * 変換マトリックスに並行移動を加えます。
		 * @param tx
		 * @param ty
		 * @returns {Transform}
		 */
		translate(tx:number,ty:number):TransformTransaction;

		/**
		 * 変換マトリックスにX軸方向への変倍を加えます。
		 * @param scaleX
		 * @returns {Transform}
		 */
		scaleX(scaleX:number):TransformTransaction;

		/**
		 * 変換マトリックスにY軸方向への変倍を加えます。
		 * @param scaleY
		 * @returns {Transform}
		 */
		scaleY(scaleY:number):TransformTransaction;
		/**
		 * 変換マトリックスに変倍を加えます。
		 * @param scaleX
		 * @param scaleY
		 * @returns {Transform}
		 */
		scale(scaleX:number,scaleY:number):TransformTransaction;

		/**
		 * 変換マトリックスに回転成分を加えます。
		 * @param rad
		 * @returns {Transform}
		 */
		rotate(transform:Transform,rad:number):TransformTransaction;

		/**
		 * マトリックスにX軸方向へのゆがみ成分を加えます。
		 * @param radX
		 * @returns {Transform}
		 */
		skewX(transform:Transform,radX:number):TransformTransaction;

		/**
		 * マトリックスにY軸方向へのゆがみ成分を加えます。
		 * @param radY
		 * @returns {Transform}
		 */
		skewY(transform:Transform,radY:number):TransformTransaction;

		/**
		 * マトリックスにゆがみ成分を加えます。
		 * @param radX
		 * @param radY
		 * @returns {Transform}
		 */
		skew(radX:number,radY:number):TransformTransaction;

		/**
		 * Matrixを結合します。
		 * @param transform
		 * @returns {Transform}
		 */
		concat(transform:Transform):TransformTransaction;
	}

	/**
	 * 線描画トランザクション
	 */
	interface PathTransaction extends DrawTransaction{

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
			cpy2:number,
			x:number,
			y:number
		):PathTransaction;
	}

	/**
	 * 線描画トランザクション
	 */
	interface ClipTransaction extends PathTransaction{

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
		 * @param cpy2
		 * @param x
		 * @param y
		 */
		bezierCurveTo (
			cpx1:number,
			cpy1:number,
			cpx2:number,
			cpy2:number,
			x:number,
			y:number
		):ClipTransaction;

		/**
		 * 直前までの変更を履歴に反映する。
		 */
		flush():void;

		// /**
		//  * 変更内容をキャンセルする。
		//  */
		// cancel():void;
		//
		// /**
		//  * 変更内容を確定する。
		//  */
		// commit():void;
	}

	/**
	 * 線描画トランザクション
	 */
	interface DrawPathTransaction extends PathTransaction{
		/**
		 * 既存の描画内容との合成方法を指定する。
		 * 0:source-over 両方のイメージの領域が描画される。重なった部分は新規イメージとなる。（初期値）<br />
		 * 1:source-atop 現在イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 2:source-in 重なった領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 3:source-out 新規イメージの領域のみが描画される。重なった部分は描画されない。<br />
		 * 4:destination-atop 新規イメージの領域のみが描画される。重なった部分は現在イメージとなる。<br />
		 * 5:destination-in 重なった領域のみが描画される。重なった部分は現在イメージとなる。<br />
		 * 6:destination-out 現在イメージの領域のみが描画される。重なった部分は描画されない。<br />
		 * 7:destination-over 両方のイメージの領域が描画される。重なった部分は現在イメージとなる。<br />
		 * 8:lighter 両方のイメージの領域が描画される。重なった部分は混色して描画される。<br />
		 * 9:copy 新規イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 10:xor 両方のイメージの領域が描画される。重なった部分は描画されない。<br />
		 * @param compositeOperation
		 */
		setCompositeOperation(compositeOperation:number):DrawPathTransaction

		/**
		 * 塗りの色を設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param color
		 */
		setFill(
			color:string
		):DrawPathTransaction;

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
		):DrawPathTransaction;

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
		):DrawPathTransaction;

		/**
		 * 線の色を設定する。
		 * @param color
		 */
		setStrokeColor(
			color:string
		):DrawPathTransaction;

		/**
		 * 破線を設定。引数がいずれもnullの場合は破線なし。
		 * @param segments
		 * @param offset
		 */
		setStrokeDash(
			segments?:number[],
			offset?:number
		):DrawPathTransaction;

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
		):DrawPathTransaction;

		/**
		 * 現在の起点を移動する。何もしなければ最初は0,0
		 * @param x
		 * @param y
		 */
		moveTo(
			x:number,
			y:number
		):DrawPathTransaction;

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
		):DrawPathTransaction;

		/**
		 * 直線を描画する。
		 * @param x
		 * @param y
		 */
		lineTo(
			x:number,
			y:number
		):DrawPathTransaction;

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
		):DrawPathTransaction;

		/**
		 * 3次ベジェ曲線を描画する。
		 * @param cpx1
		 * @param cpy1
		 * @param cpx2
		 * @param cpy2
		 * @param x
		 * @param y
		 */
		bezierCurveTo (
			cpx1:number,
			cpy1:number,
			cpx2:number,
			cpy2:number,
			x:number,
			y:number
		):DrawPathTransaction;

		// /**
		//  * 直前までの変更を履歴に反映する。
		//  */
		// flush():void;
		//
		// /**
		//  * 変更内容をキャンセルする。
		//  */
		// cancel():void;
		//
		// /**
		//  * 変更内容を確定する。
		//  */
		// commit():void;
	}

	/**
	 * 全面、背面入れ替えのトランザクション
	 */
	interface ChangeSequenceTransaction extends DrawTransaction{

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
		// /**
		//  * 変更内容をキャンセルする。
		//  */
		// cancel():void;
		// /**
		//  * 変更内容を確定する。
		//  */
		// commit():void;
	}

	/**
	 * テキスト編集トランザクション
	 */
	interface TextTransaction extends DrawTransaction{

		/**
		 * 既存の描画内容との合成方法を指定する。
		 * 0:source-over 両方のイメージの領域が描画される。重なった部分は新規イメージとなる。（初期値）<br />
		 * 1:source-atop 現在イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 2:source-in 重なった領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 3:source-out 新規イメージの領域のみが描画される。重なった部分は描画されない。<br />
		 * 4:destination-atop 新規イメージの領域のみが描画される。重なった部分は現在イメージとなる。<br />
		 * 5:destination-in 重なった領域のみが描画される。重なった部分は現在イメージとなる。<br />
		 * 6:destination-out 現在イメージの領域のみが描画される。重なった部分は描画されない。<br />
		 * 7:destination-over 両方のイメージの領域が描画される。重なった部分は現在イメージとなる。<br />
		 * 8:lighter 両方のイメージの領域が描画される。重なった部分は混色して描画される。<br />
		 * 9:copy 新規イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
		 * 10:xor 両方のイメージの領域が描画される。重なった部分は描画されない。<br />
		 * @param compositeOperation
		 */
		setCompositeOperation(compositeOperation:number):TextTransaction

		setPosition(x:number,y:number):TextTransaction;

		/**
		 * テキストの塗りを設定する。
		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
		 * @param color
		 */
		setFill(
			color:string
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
		 * フォントファミリーを設定する。
		 * @param fontFamily
		 */
		setFontFamily(fontFamily:string):TextTransaction;

		/**
		 * フォントサイズを設定する。
		 * @param size
		 */
		setSize(size:number):TextTransaction;

		/**
		 * フォント太さを設定する。
		 * @param weight
		 */
		setWeight(weight:number):TextTransaction;

		/**
		 * フォントスタイルを設定する。
		 * @param style
		 */
		setStyle(style:number):TextTransaction;
		//
		// /**
		//  * 変更内容をキャンセルする。
		//  */
		// cancel():void;
		//
		// /**
		//  * 変更内容を確定する。
		//  */
		// commit():void;
	}
}