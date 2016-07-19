declare namespace drawchat.renderer {

	interface DrawchatRenderer{

		/**
		 * レイヤーの数を取得します。
		 */
		size():number;

		/**
		 * レイヤーの前面＞背面の順序を変更する。
		 * @param order 元の添字を格納したリスト。リストの添字順にソートされる。
		 */
		sortLayer(order:number[]):void;

		/**
		 * 指定された添字のレイヤーを削除する。
		 * @param index
		 */
		removeLayer(index:number):void;

		/**
		 * レイヤーを新規に追加する。<br />
		 * 追加したレイヤーの添字
		 */
		addLayer():number;

		/**
		 * 指定された添字のレイヤーを一から描画する。
		 * @param index 対象レイヤーの添字
		 * @param draws 差分描画内容
		 * @param transform 変形成分
		 * @param clip くりぬきの指定
		 */
		render(
			index:number,
			draws:Draw[],
			transform?:Transform,
			clip?:Clip
		):void;

		/**
		 * 指定された添字のレイヤーに対し、差分を描画する。
		 * @param index 対象レイヤーの添字
		 * @param draws 差分描画内容
		 */
		renderDiff(
			index:number,
			draws:Draw[]
		):void;

		/**
		 * 画面をリフレッシュし、renderメソッドの結果を画面に反映する。
		 */
		refresh():void;

		/**
		 * 描画内容を全てクリアする。
		 */
		clear():void;

		/**
		 * 画像をbase64化したデータを取得する。
		 */
		createImageDataURL():string;

		/**
		 * 指定された添字のレイヤーを表示状態に設定する。
		 * 引数が指定されていない場合は全件表示。
		 * @param target
		 */
		show(target?:number[]):void;

		/**
		 * 指定された添字のレイヤーを非表示状態に設定する。
		 * 引数が指定されていない場合は全件非表示。
		 * @param target
		 */
		hide(target?:number[]):void;
	}
}