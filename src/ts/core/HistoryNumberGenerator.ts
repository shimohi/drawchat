export class HistoryNumberGenerator {

	private num:number;

	constructor(){
		this.num = 0|0;
	}

	/**
	 * 採番処理を行います。
	 * @returns {number}
	 */
	getNumber():number{
		this.num = (this.num + 1)|0;
		return this.num;
	}
}