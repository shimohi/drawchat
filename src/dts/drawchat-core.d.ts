declare namespace drawchat.core {

	interface DrawHistory{

		/**
		 * 現在の履歴番号を取得します。
		 */
		getNowHistoryNumber():number;

		/**
		 * 最終履歴番号を取得します。
		 */
		getLastHistoryNumber():number;

		/**
		 * 初回の履歴番号を取得します。存在しない場合は-1が返ります。
		 */
		getFirstHistoryNumber():number;

		/**
		 * 指定された範囲の履歴を取得します。
		 * @param from
		 * @param to
		 */
		getMoments(from:number,to:number):DrawMoment[];

		/**
		 * 履歴番号を設定します。<br />
		 * 現在の履歴番号に指定値の履歴番号が存在しない場合は指定値以下で最も大きい履歴番号が設定されます。
		 * 以降の更新メソッドが発生した際、指定値より大きい履歴が削除されます。
		 */
		setHistoryNumber(historyNumber:number):DrawMoment[];

		/**
		 * 履歴を計算し、現在のDrawMessageを生成します。
		 */
		generateMessage():Message;

		/**
		 * 履歴をクリアします。
		 */
		clear():void;

		/**
		 * 新しいレイヤーを追加します。
		 * @param layer
		 */
		addLayer(layer:Layer):DrawMoment;

		/**
		 * 指定されたIDのレイヤーを削除します。
		 * @param layerId
		 */
		removeLayer(layerId:string):DrawMoment;

		/**
		 * 編集履歴を積み上げます。
		 * @param canvasSequence
		 * @param canvasMoments
		 */
		addMoment(
			canvasSequence:string[],
			canvasMoments:DrawLayerMoment[]
		):DrawMoment;

		/**
		 * 更新イベントを待ち受けるリスナーを設定します。
		 * 指定されたcallBackは一度のみ呼び出されます。
		 * 継続してイベントを受け取りたい場合は設定側で都度このメソッドを発行する必要があります。
		 * @param callback
		 */
		awaitUpdate(callback:(historyNumber:number)=>void):void;
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

	/**
	 * Canvas毎の履歴アイテム
	 */
	interface DrawLayerMoment{

		/**
		 * CanvasId
		 */
		canvasId:string;

		/**
		 * Canvas全体の変形成分。
		 * 変更がある場合は毎回全体上書き。
		 */
		transform:Transform;

		/**
		 * Canvasの切り抜き。
		 * 変更がある場合は毎回全体上書き。<br />
		 * 切り抜きしたくない場合はpathの値がnullな空のClipを設定する。
		 */
		clip:Clip;

		/**
		 * 書き込み履歴（追加分のみ）
		 */
		draws:Draw[];
	}
}