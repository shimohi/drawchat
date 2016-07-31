declare namespace drawchat.core {

	interface DrawHistory{

		/**
		 * 履歴番号の一覧を取得する。
		 */
		getHistoryNumbers():number[];

		/**
		 * 現在の履歴番号を取得する。
		 */
		getNowHistoryNumber():number;

		/**
		 * 最終履歴番号を取得する。
		 */
		getLastHistoryNumber():number;

		/**
		 * 初回の履歴番号を取得する。存在しない場合は-1が返る。
		 */
		getFirstHistoryNumber():number;

		/**
		 * 指定された範囲の履歴を取得する。
		 * @param from
		 * @param to
		 */
		getMoments(from:number,to:number,ignoreLocal?:boolean):DrawMoment[];

		// /**
		//  * 履歴番号を設定する。<br />
		//  * 現在の履歴番号に指定値の履歴番号が存在しない場合は指定値以下で最も大きい履歴番号が設定される。
		//  * 以降の更新メソッドが発生した際、指定値より大きい履歴が削除される。
		//  */
		// setHistoryNumberNow(historyNumber:number):number;

		/**
		 * 履歴を計算し、現在のDrawMessageを生成する。
		 */
		generateMessage(ignoreLocal?:boolean):Message;

		// /**
		//  * 履歴をクリアする。
		//  */
		// clear():void;
		//
		// /**
		//  * 新しいレイヤーを追加する。
		//  * @param layer
		//  * @param isLocal
		//  */
		// addLayer(layer:Layer,isLocal?:boolean):DrawMoment;
		//
		// /**
		//  * 指定されたIDのレイヤーを削除する。
		//  * @param layerId
		//  */
		// removeLayer(layerId:string):void;

		/**
		 * 指定されたhistoryNumber時点のレイヤーリストを取得する。
		 * @param historyNumber
		 */
		getLayers(historyNumber?:number,ignoreLocal?:boolean):string[];

		// /**
		//  * 編集履歴を積み上げる。
		//  * 結果はcommit時に反映する。
		//  */
		// addMoment():DrawMomentBuilder;

		/**
		 * 更新イベントを待ち受けるリスナーを設定する。
		 * 指定されたcallBackは一度のみ呼び出される。
		 * 継続してイベントを受け取りたい場合は設定側で都度このメソッドを発行する必要がある。
		 * @param callback
		 */
		awaitUpdate(callback:(historyNumber:number)=>void):void;

		/**
		 * 編集セッションを開始する。
		 * @param noWait 現在ロックしている編集セッションを強制的に解除するかどうか。
		 */
		lock(noWait?:boolean):Promise<DrawHistoryEditSession>;
	}

	interface DrawHistoryEditSession{

		/**
		 * 履歴番号を設定する。<br />
		 * 現在の履歴番号に指定値の履歴番号が存在しない場合は指定値以下で最も大きい履歴番号が設定される。
		 * 以降の更新メソッドが発生した際、指定値より大きい履歴が削除される。
		 * @param historyNumber
		 * @param clearFuture 指定されたhistoryNumberより先の履歴を削除するかどうか。デフォルト値はfalse
		 */
		setHistoryNumberNow(historyNumber:number,clearFuture?:boolean):number;

		/**
		 * 履歴をクリアする。
		 */
		clear():void;

		/**
		 * 新しいレイヤーを追加する。
		 * @param layer
		 * @param isLocal
		 */
		addLayer(layer:Layer,isLocal?:boolean):DrawMoment;

		/**
		 * 指定されたIDのレイヤーを削除する。
		 * @param layerId
		 */
		removeLayer(layerId:string):void;

		/**
		 * 編集履歴を積み上げる。
		 * 結果はcommit時に反映する。
		 */
		addMoment():DrawMomentBuilder;

		/**
		 * 編集セッションを解放する。
		 */
		release():void;
	}

	interface DrawMomentBuilder{

		putLayerMoment(
			key:string
		):DrawLayerMomentBuilder;

		setSequence(sequence:string[]):DrawMomentBuilder;

		commit():DrawMoment
	}

	/**
	 * 履歴アイテム
	 */
	interface DrawMoment{

		/**
		 * 履歴番号
		 */
		getHistoryNumber():number;

		/**
		 * CanvasId毎の変更マッピング。
		 */
		getKeys():string[];
		getLayerMoment(key:string):DrawLayerMoment;

		/**
		 * Canvasの表示順　背面であるほど小さい添字。
		 * 更新される毎に全件分設定され、ここにないCanvasは削除扱いとする。
		 */
		getSequence():string[];
	}

	interface DrawLayerMomentBuilder{

		setTransForm(
			transform:Transform
		):DrawLayerMomentBuilder;

		setClip(
			clip:Clip
		):DrawLayerMomentBuilder;

		addDraw(
			draw:Draw
		):DrawLayerMomentBuilder;

		addDraws(
			draw:Draw[]
		):DrawLayerMomentBuilder;

		commit():DrawMomentBuilder;
	}

	/**
	 * Canvas毎の履歴アイテム
	 */
	interface DrawLayerMoment{

		/**
		 * CanvasId
		 */
		getCanvasId():string;

		/**
		 * Canvas全体の変形成分。
		 * 変更がある場合は毎回全体上書き。
		 */
		getTransform():Transform;

		/**
		 * Canvasの切り抜き。
		 * 変更がある場合は毎回全体上書き。<br />
		 * 切り抜きしたくない場合はpathの値がnullな空のClipを設定する。
		 */
		getClip():Clip;

		/**
		 * 書き込み履歴（追加分のみ）
		 */
		getDraws():Draw[];
	}
}