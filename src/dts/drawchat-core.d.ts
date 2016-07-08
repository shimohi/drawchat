declare namespace drawchat.core {

	interface DrawHistory{





	}

	/**
	 * 履歴アイテム
	 */
	interface DrawMoment{
		/**
		 * CanvasId毎の変更マッピング。
		 */
		getKeys():string[];
		getCanvasMoment(key:string):DrawCanvasMoment;
		/**
		 * Canvasの表示順　背面であるほど小さい添字。
		 * 更新される毎に全件分設定され、ここにないCanvasは削除扱いとする。
		 */
		getSequence():string[];
	}

	/**
	 * Canvas毎の履歴アイテム
	 */
	interface DrawCanvasMoment{
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