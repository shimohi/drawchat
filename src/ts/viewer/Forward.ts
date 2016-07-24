import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {MapMomentUtil} from "./MapMomentUtil";
import {CheckStateUtils} from "./CheckStateUtils";
import NamedLayer = drawchat.viewer.NamedLayer;
export class Forward{

	static updateView(
		renderer:DrawchatRenderer,
		sequencesNow:string[],
		layers:NamedLayer[]
	):string[]{

		let layerIds = [];
		for(let layer of layers){
			layerIds.push(layer.layerId);
		}

		let updateStateMap = CheckStateUtils.checkState(
			sequencesNow,
			layers
		);

		//レイヤーの補完
		Forward.complementLayer(renderer,sequencesNow,updateStateMap);

		//表示順の変更
		renderer.sortLayer(CheckStateUtils.createSortOrder(sequencesNow,layerIds));

		//更新の反映
		let i = 0 | 0;
		let layer;
		while(i < layers.length){
			layer = layers[i];
			i = (i + 1) | 0;

			if(layer.clip == null && layer.transform == null){
				renderer.renderDiff(i,layer.draws);
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
	):void{

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
	}
}