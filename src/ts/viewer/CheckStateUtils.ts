import NamedLayer = drawchat.viewer.NamedLayer;
export class CheckStateUtils{

	/**
	 * 変更前後のID順序からRendererに設定するソートオーダーを計算する。
	 * @param beforeLayers
	 * @param afterLayers
	 * @returns {Array}
	 */
	static createSortOrder(
		beforeLayers:string[],
		afterLayers:string[]
	):number[]{

		let map = {};
		let i = 0 | 0;
		while( i < beforeLayers.length){
			map[beforeLayers[i]] = i;
		}

		i = 0 | 0;
		let result = [];
		while( i < afterLayers.length){
			result.push(map[afterLayers[i]]);
		}
		return result;
	}

	/**
	 * 変更区分を計算する。
	 * @param beforeLayers
	 * @param afterLayers
	 * @returns {{}}
	 */
	static checkState(
		beforeLayers:string[],
		afterLayers:NamedLayer[]
	):UpdateStateMap{

		let map = {};

		let i = 0 | 0;
		let len = beforeLayers.length;
		while(i < len){
			map[beforeLayers[i]] = UpdateState.DELETE;
			i = (i + 1) | 0;
		}

		i = 0 | 0;
		len = afterLayers.length;
		let layer:NamedLayer;
		while(i < len){
			layer = afterLayers[i];
			i = (i + 1) | 0;

			if(map[layer.layerId] == null){
				map[layer.layerId] = UpdateState.ADD;
				continue;
			}
			if(layer.clip != null || layer.transform != null){
				map[layer.layerId] = UpdateState.UPDATE_ALL;
				continue;
			}
			if(layer.draws.length > 0){
				map[layer.layerId] = UpdateState.UPDATE;
				continue;
			}
			map[layer.layerId] = UpdateState.NON;
		}
		return map;
	}
}