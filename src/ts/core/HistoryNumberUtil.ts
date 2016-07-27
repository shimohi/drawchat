export class HistoryNumberUtil{

	/**
	 * HistoryNumberのリストから指定値のhistoryNumberを検索する。
	 * 一致するものがなければ直近のものを返す。
	 * @param historyNumbers
	 * @param historyNumber
	 * @returns {number}
	 */
	static getHistoryIndex(
		historyNumbers:number[],
		historyNumber:number
	):number{

		if(historyNumber < 0){
			return -1;
		}

		//	２分木探索で特定
		let min = 0 | 0;
		let max = (historyNumbers.length - 1) | 0;
		let index = -1;

		while(max >= min){

			index = min + (((max - min) / 2) | 0);
			let number1 = historyNumbers[index];

			if(number1 === historyNumber){
				return index;
			}

			if(number1 > historyNumber){
				max = number1;
				continue;
			}
			min = number1;
		}

		if(index < 0){
			return index;
		}
		if(historyNumbers[index] > historyNumber){
			return index - 1;
		}
		return index;
	}
}
export default HistoryNumberUtil;