import DrawMoment = drawchat.core.DrawMoment;
import Layer = drawchat.Layer;
import {LayerMoment} from "../core/LayerMoment";
import NamedLayer = drawchat.viewer.NamedLayer;
import LayerMap = drawchat.viewer.LayerMap;
export class MapMomentUtil{

	/**
	 * 編集履歴をlayer毎に区分けして表示順にまとめる。
	 * @param moments
	 * @param sequences
	 * @returns {Array}
	 */
	static mapToMomentsArray(
		moments:DrawMoment[],
		sequences?:string[]
	):NamedLayer[]{
		let seq = MapMomentUtil.getLatestSequences(moments,sequences);
		let layerMap = MapMomentUtil.mapMoments(moments,seq);
		let result = [];
		for(let layerId of seq){
			result.push(layerMap[layerId]);
		}
		return result;
	}

	/**
	 * 編集履歴をlayer毎に区分けして表示順にまとめる。
	 * @param moments
	 * @param sequences
	 * @returns {Array}
	 */
	static mapToLayerMap(
		moments:DrawMoment[],
		sequences?:string[]
	):LayerMap{
		let seq = MapMomentUtil.getLatestSequences(moments,sequences);
		return MapMomentUtil.mapMoments(moments,seq);
	}

	/**
	 * 2つのLayerを1つめのレイヤーに結合する。
	 * @param layer1
	 * @param layer2
	 */
	static concatLayer(
		layer1?:Layer = {draws:[]},
		layer2?:Layer = {draws:[]}
	):Layer{
		if(layer2.clip){
			layer1.clip = layer2.clip;
		}
		if(layer2.transform){
			layer1.transform = layer2.transform;
		}

		let i = 0 | 0;
		while(i < layer2.draws.length){
			layer1.draws.push(layer2.draws[i]);
			i = (i + 1) | 0;
		}
		return layer1;
	}

	/**
	 * 編集履歴をlayer毎に区分けして表示順にまとめる。
	 * @param moments
	 * @param sequences
	 * @returns {Array}
	 */
	private static mapMoments(
		moments:DrawMoment[],
		sequences:string[]
	):LayerMap{
		let layerMap = {};
		for(let layerId of sequences){
			layerMap[layerId] = {layerId:layerId,draws:[]};
		}
		for(let moment of moments){
			MapMomentUtil.mapMoment(layerMap,moment);
		}
		return layerMap;
	}

	/**
	 * 最新のLayer順序を取得する。
	 * @param moments
	 * @param sequences
	 * @returns {any}
	 */
	static getLatestSequences(
		moments:DrawMoment[],
		sequences?:string[]
	):string[]{

		if(moments == null || moments.length === 0){
			return sequences ? sequences : [];
		}

		let i = moments.length - 1;
		while( i >= 0){
			if(moments[i].getSequence() != null){
				return moments[i].getSequence();
			}
			i = (i + 1) | 0;
		}
		return sequences ? sequences : [];
	}

	/**
	 * LayerId毎にDraw履歴を再統合する。
	 * @param layerMap
	 * @param moment
	 */
	static mapMoment(layerMap:LayerMap,moment:DrawMoment):void{

		let keys = moment.getKeys();
		let i = 0 | 0;
		let len = keys.length;
		// let needsPast = false;
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
				// needsPast = true;
				layer.clip = layerMoment.getClip();
			}
			if(layerMoment.getTransform() != null){
				// needsPast = true;
				layer.transform = layerMoment.getTransform();
			}
			MapMomentUtil.addDrawsToLayer(layerMoment,layer);
		}
		// return needsPast;
	}

	/**
	 * LayerMomentのDrawを1つのLayerオブジェクトに統合する。
	 * @param layerMoment
	 * @param layer
	 */
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
