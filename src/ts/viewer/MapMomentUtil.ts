import DrawMoment = drawchat.core.DrawMoment;
import Layer = drawchat.Layer;
import {LayerMoment} from "../core/LayerMoment";
import NamedLayer = drawchat.viewer.NamedLayer;
export class MapMomentUtil{
	/**
	 * 編集履歴をlayer毎に区分けして表示順にまとめる。
	 * @param moments
	 * @param sequences
	 * @returns {Array}
	 */
	static mapMoments(
		moments:DrawMoment[],
		sequences?:string[]
	):NamedLayer[]{
		var sequences1 = sequences ? sequences : [];
		let layerMap = {};
		for(let moment of moments){
			if(moment.getSequence() == null){
				continue;
			}
			sequences1 = moment.getSequence();
		}
		for(let layerId of sequences1){
			layerMap[layerId] = {layerId:layerId,draws:[]};
		}
		for(let moment of moments){
			MapMomentUtil.mapMoment(layerMap,moment);
		}
		let result = [];
		for(let layerId of sequences1){
			result.push(layerMap[layerId]);
		}
		return result;
	}

	static mapMoment(layerMap:LayerMap,moment:DrawMoment):boolean{

		let keys = moment.getKeys();
		let i = 0 | 0;
		let len = keys.length;
		let needsPast = false;
		var layerMoment;
		var layer;

		while(i < len){
			layerMoment = moment.getLayerMoment(keys[i]);
			layer = layerMap[keys[i]];
			i = (i + 1) | 0;
			if(layer != null){
				continue;
			}
			if(layerMoment.getClip() != null){
				needsPast = true;
				layer.clip = layerMoment.getClip();
			}
			if(layerMoment.getTransform() != null){
				needsPast = true;
				layer.transform = layerMoment.getTransform();
			}
			MapMomentUtil.addDrawsToLayer(layerMoment,layer);
		}
		return needsPast;
	}

	private static  addDrawsToLayer(layerMoment:LayerMoment,layer:Layer){
		let draws = layerMoment.getDraws();
		if(draws == null || draws.length === 0){
			return;
		}

		let i = 0 | 0;
		while(i < draws.length){
			layer.draws.push(draws[i]);
			i = (i + 1) | 0;
		}
	}
}
interface LayerMap{
	[key:string]:NamedLayer;
}