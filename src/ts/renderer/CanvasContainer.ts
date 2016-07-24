import * as CombineCanvasUtil from "./CombineCanvasUtil";

export class CanvasContainer{

	/**
	 * 親要素
	 */
	private parent:Element;
	private elementList:HTMLCanvasElement[] = [];
	private contextList:CanvasRenderingContext2D[] = [];

	width:number;
	height:number;

	constructor(
		parent:Element,
		width?:number,
		height?:number
	){
		this.parent = parent;
		this.width = width ? width : parent.clientWidth;
		this.height = height ? height : parent.clientHeight;
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

		let elementList1 = [];
		let canvasList1 = [];

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
		for(let element of this.elementList){
			this.parent.removeChild(element);
		}
		this.elementList = [];
		this.contextList = [];
	}
}