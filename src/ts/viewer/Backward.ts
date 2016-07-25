import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {MapMomentUtil} from "./MapMomentUtil";
import {CheckStateUtils} from "./CheckStateUtils";
import NamedLayer = drawchat.viewer.NamedLayer;
import LayerMap = drawchat.viewer.LayerMap;
import DrawMoment = drawchat.core.DrawMoment;
export class Backward{

	static updateView(
		renderer:DrawchatRenderer,
		sequencesNow:string[],
		pastMoments:DrawMoment[],
		futureMoments:DrawMoment[]
	):string[]{

		let pastLayers = MapMomentUtil.mapToMomentsArray(pastMoments);
		let layerIds = [];
		for(let layer of pastLayers){
			layerIds.push(layer.layerId);
		}

		let layers = MapMomentUtil.mapToMomentsArray(futureMoments,layerIds);
		let updateStateMap = CheckStateUtils.checkState(
			sequencesNow,
			layers
		);

		//レイヤーの補完
		Backward.complementLayer(renderer,sequencesNow,updateStateMap);

		//表示順の変更
		renderer.sortLayer(CheckStateUtils.createSortOrder(sequencesNow,layerIds));

		//更新の反映
		let i = 0 | 0;
		let layer;
		let state;

		while(i < pastLayers.length){
			layer = pastLayers[i];
			i = (i + 1) | 0;

			state = updateStateMap[layer.layerId];
			if(state === UpdateState.ADD || state === UpdateState.NON){
				continue;
			}

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
			if(state === UpdateState.ADD){
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
			if(state !== UpdateState.DELETE){
				continue;
			}
			renderer.addLayer();
			result.push(key);
		}
		return result;
	}
}