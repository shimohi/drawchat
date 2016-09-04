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
		if(typeof parent === 'string'){
			this.id = <string>parent;
			this.width = width;
			this.height = height;
			return;
		}
		this.parent = <Element>parent;
		this.width = width ? width : this.parent.clientWidth;
		this.height = height ? height : this.parent.clientHeight;
	}

	getParent():Element{
		if(this.parent != null){
			return this.parent;
		}
		this.parent =  document.getElementById(this.id);
		this.width = this.width ? this.width : this.parent.clientWidth;
		this.height = this.height ? this.height : this.parent.clientHeight;
		return this.parent;
	}

	getSize():number{
		return this.elementList.length;
	}

	getCanvas(index:number):CanvasRenderingContext2D{
		return this.contextList.length > index ? this.contextList[index] : null;
	}

	addCanvas():number{
		let element:HTMLCanvasElement = this.parent.ownerDocument.createElement("canvas");
		this.getParent().appendChild(element);

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
		try {
			this.getParent().removeChild(element);
		} catch (e) {
			//	後始末中と重なる可能性があるので無視
		}
		this.contextList.splice(index,1);
		this.elementList.splice(index,1);
	}

	sortCanvas(orders:number[]):void{

		//一旦全件削除
		for(let element of this.elementList){
			try {
				this.getParent().removeChild(element);
			} catch (e) {
				//無視
			}
		}

		let elementList1:HTMLCanvasElement[] = [];
		let canvasList1:CanvasRenderingContext2D[] = [];

		let i = 0 | 0;
		while(i < orders.length){
			let order = orders[i];
			if(order < 0 || order >= this.elementList.length){
				i = (i + 1) | 0;
				continue;
			}
			elementList1[i] = this.elementList[order];
			canvasList1[i] = this.contextList[order];

			try {
				this.getParent().appendChild(elementList1[i]);
			} catch (e) {
				console.log(e);
			}
			i = (i + 1) | 0;
		}
		this.elementList = elementList1;
		this.contextList = canvasList1;
	}

	clear():void{
		if(this.id !== null){
			this.parent = null;
		}
		this.elementList = [];
		this.contextList = [];
		let element = this.getParent();
		if(element == null){
			return;
		}
		while (element.firstChild) element.removeChild(element.firstChild);
	}
}