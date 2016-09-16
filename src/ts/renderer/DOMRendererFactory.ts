import {MultiCanvas2DRenderer} from "./MultiCanvas2DRenderer";
import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {DOMCanvasManager} from "./DOMCanvasManager";

/**
 * 指定された要素配下にRendererコンポーネントを配置する。
 * @param parent この要素から見て0,0を左上として描画する。直下要素は空である必要がある。
 * 		styleのposition 属性はrelativeにしておく。
 * @param width 要素の幅。指定されていない場合はrendererのデフォルト値が指定される。
 * @param height 要素の高さ。指定されていない場合はrendererのデフォルト値が指定される。
 */
export default function(
	parent:Element|string,
	width?:number,
	height?:number
):DrawchatRenderer{
	return new MultiCanvas2DRenderer(new DOMCanvasManager(parent,width,height));
}
