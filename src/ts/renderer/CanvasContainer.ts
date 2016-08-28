import * as CombineCanvasUtil from "./CombineCanvasUtil";

export class CanvasContainer{

	/**
	 * 親要素
	 */
	private id:string;
	private parent:Element;
	private elementList:HTMLCanvasElement[] = [];
	private contextList:CanvasRenderingContext2D[] = [];

	width:number;
	height:number;

	constructor(
		parent:Element|string,
		width?:number,
		height?:number
	){
		this.id = (typeof parent === 'string') ? <string>parent : null;
		try {
			this.parent = (typeof parent !== 'string')
				? <Element>parent : document.getElementById(parent);

			this.width = width ? width : this.parent.clientWidth;
			this.height = height ? height : this.parent.clientHeight;
		} catch (e) {
			//	無視する
		}
	}

	getSize():number{
		return this.elementList.length;
	}

	getCanvas(index:number):CanvasRenderingContext2D{
		return this.contextList.length > index ? this.contextList[index] : null;
	}

	addCanvas():number{
		let element:HTMLCanvasElement = this.parent.ownerDocument.createElement("canvas");
		this.parent.appendChild(element);

		element.width = this.width;
		element.height = this.height;
		element.style.position = "absolute";

		this.elementList.push(element);
		this.contextList.push(element.getContext("2d"));
		return this.elementList.length - 1;
	}

	combineDataImage():string{
		return CombineCanvasUtil.combine(
			this.width,
			this.height,
			this.elementList[0],
			this.contextList
		);
	}

	removeCanvas(index:number):void{
		let element = this.elementList[index];
		this.parent.removeChild(element);
		this.contextList.splice(index,1);
		this.elementList.splice(index,1);
	}

	sortCanvas(orders:number[]):void{

		//一旦全件削除
		for(let element of this.elementList){
			this.parent.removeChild(element);
		}

		let elementList1:HTMLCanvasElement[] = [];
		let canvasList1:CanvasRenderingContext2D[] = [];

		let i = 0 | 0;
		while(i < this.elementList.length){
			let order = orders[i];
			if(order >= this.elementList.length){
				continue;
			}

			elementList1[i] = this.elementList[order];
			canvasList1[i] = this.contextList[order];

			this.parent.appendChild(elementList1[i]);
			i = (i + 1) | 0;
		}
		this.elementList = elementList1;
		this.contextList = canvasList1;
	}

	clear():void{
		if(this.id === null){
			for(let element of this.elementList){
				try {
					this.parent.removeChild(element);
				} catch (e) {
					//	ここでのエラーは無視
				}
			}
			this.elementList = [];
			this.contextList = [];
			return;
		}

		this.elementList = [];
		this.contextList = [];
		this.parent = document.getElementById(this.id);
		if(this.parent == null){
			return;
		}
		while (this.parent.firstChild) this.parent.removeChild(this.parent.firstChild);

		this.width = this.width ? this.width : this.parent.clientWidth;
		this.height = this.height ? this.height : this.parent.clientHeight;
	}
}