declare namespace drawchat.updator {

	interface Updator{

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

		setMatrix(transform:Transform):void;

		rollback():void;

		commit():void;
	}

	/**
	 * 切り抜きトランザクション
	 */
	interface ClipTransaction{
		rollback():void;
		commit():void;
	}

	/**
	 * 線描画トランザクション
	 */
	interface PathTransaction{

		rollback():void;
		commit():void;
	}

	/**
	 * 全面、背面入れ替えのトランザクション
	 */
	interface ChangeSequenceTransaction{



		rollback():void;
		commit():void;
	}

	/**
	 * テキスト編集トランザクション
	 */
	interface TextTransaction{
		rollback():void;
		commit():void;
	}
}