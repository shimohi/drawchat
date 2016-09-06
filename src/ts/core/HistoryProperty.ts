import DrawMoment = drawchat.core.DrawMoment;
import NumberGenerator = drawchat.core.NumberGenerator;
import KeyGenerator = drawchat.core.KeyGenerator;

import {HistoryNumberUtil} from "./HistoryNumberUtil";

/**
 * HistoryとHistorySessionで共有するプロパティ
 */
export class HistoryProperty{

	/**
	 * 現在の履歴番号
	 * @type {number}
	 */
	historyNumberNow:number = - 1;

	/**
	 * 履歴番号のリスト
	 * @type {Array}
	 */
	historyNumbers:number[] = [];

	/**
	 * レイヤー増減、順序移動を伴う履歴番号のリスト
	 * @type {Array}
	 */
	sequencesHistoryNumbers:number[] = [];

	/**
	 * 履歴番号とDrawMomentとのマッピング
	 * @type {{}}
	 */
	map:Map<number,DrawMoment> = new Map();

	/**
	 * 変更通知を受け取るリスナー
	 * @type {Array}
	 */
	listeners:any[] = [];

	/**
	 * 履歴番号採番
	 */
	numberGenerator:NumberGenerator;

	/**
	 * レイヤー番号採番
	 */
	layerNumberGenerator:KeyGenerator;

	/**
	 * ローカルレイヤーのマップ
	 */
	localLayers:{[key:string]:string}={};

	getLayers(
		historyNumber?:number,
		ignoreLocal:boolean = false
	):string[]{

		var historyNum = historyNumber;
		if(historyNum !== 0 && (!historyNum || historyNum < 0 )){
			historyNum = this.historyNumberNow;
		}
		let i = (this.sequencesHistoryNumbers.length - 1) | 0;
		if(historyNum){
			i = HistoryNumberUtil.getHistoryIndex(this.sequencesHistoryNumbers,historyNum);
		}
		if(i < 0){
			return [];
		}
		let moment = this.map.get(this.sequencesHistoryNumbers[i]);
		if(!moment){
			return[];
		}
		if(!ignoreLocal){
			return moment.getSequence().concat();
		}

		let moments = moment.getSequence();
		let result:string[] = [];
		if(moments == null){
			return result;
		}
		i = 0 | 0;
		while(i < moments.length){
			if(this.localLayers[moments[i]] != null){
				result.push(moments[i]);
			}
			i = (i + 1)|0;
		}
		return result;
	}
}