export class CanvasContainer{

	/**
	 * 親要素
	 */
	private parent:Element;

	private elementList:Element[] = [];

	private contextList:CanvasRenderingContext2D[] = [];

	constructor(parent:Element){
		this.parent = parent;
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

		this.elementList.push(element);
		this.contextList.push(element.getContext("2d"));
		return this.elementList.length - 1;
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