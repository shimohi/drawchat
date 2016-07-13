declare namespace drawchat.viewer {

	import Renderer = drawchat.renderer.Renderer;
	import DrawHistory = drawchat.core.DrawHistory;

	/**
	 * 編集内容と描画をリアルタイムで結びつけるクラス。
	 */
	interface Viewer{
		// renderer:Renderer;
		// history:DrawHistory;

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

	interface ViewerFactory{
		createInstance(
			renderer:Renderer,
			core?:DrawHistory
		):Viewer;
	}
}