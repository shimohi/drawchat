import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {CheckStateUtils} from "./CheckStateUtils";
import NamedLayer = drawchat.viewer.NamedLayer;
import LayerMap = drawchat.viewer.LayerMap;
import {MapMomentUtil} from "./MapMomentUtil";
import DrawMoment = drawchat.core.DrawMoment;

/**
 * 前方向への更新
 */
export class Forward{

	/**
	 * Rendererを更新する。
	 * @param renderer
	 * @param sequencesNow
	 * @param pastMoments
	 * @param futureMoments
	 * @returns {Array}
	 */
	static updateView(
		renderer:DrawchatRenderer,
		sequencesNow:string[],
		pastMoments:DrawMoment[],
		futureMoments:DrawMoment[]
		// pastMap:LayerMap,
		// layers:NamedLayer[]
	):string[]{

		let pastMap = MapMomentUtil.mapToLayerMap(pastMoments);
		let layers = MapMomentUtil.mapToMomentsArray(futureMoments,sequencesNow);
		let layerIds = [];
		for(let layer of layers){
			layerIds.push(layer.layerId);
		}

		let updateStateMap = CheckStateUtils.checkState(
			sequencesNow,
			layers
		);

		//レイヤーの補完
		let sequences = Forward.complementLayer(renderer,sequencesNow,updateStateMap);

		//表示順の変更
		renderer.sortLayer(CheckStateUtils.createSortOrder(sequences,layerIds));

		//更新の反映
		let i = 0 | 0;
		let layer;
		while(i < layers.length){
			layer = layers[i];
			i = (i + 1) | 0;

			if(updateStateMap[layer.layerId] === UpdateState.NON){
				continue;
			}
			if(
				updateStateMap[layer.layerId] === UpdateState.UPDATE
			||	updateStateMap[layer.layerId] === UpdateState.ADD){
				renderer.renderDiff(i,layer.draws);
				continue;
			}
			layer = MapMomentUtil.concatLayer(pastMap[layer.layerId],layer);
			renderer.render(i,layer.draws,layer.transform,layer.clip);
		}
		return layerIds;
	}

	static complementLayer(
		renderer:DrawchatRenderer,
		layerIds:string[],
		updateStateMap:UpdateStateMap
	):string[]{

		let i = (layerIds.length - 1) | 0;
		let state:UpdateState;
		let key:string;
		let result = [];

		//	削除を抽出
		while( i >= 0){
			key = layerIds[i];
			state = updateStateMap[key];
			if(state === UpdateState.DELETE){
				renderer.removeLayer(i);
				i = (i - 1) | 0;
				continue;
			}
			result.push(key);
			i = (i - 1) | 0;
		}
		result.reverse();

		//	追加を実行
		let keys = Object.keys(updateStateMap);
		let i = 0 | 0;

		while( i  < keys.length){
			key = layerIds[i];
			state = updateStateMap[key];
			i = (i - 1) | 0;
			if(state !== UpdateState.ADD){
				continue;
			}
			renderer.addLayer();
			result.push(key);
		}
		return result;
	}
}