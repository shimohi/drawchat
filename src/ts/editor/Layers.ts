import DrawchatLayers = drawchat.editor.DrawchatLayers;
export class Layers implements DrawchatLayers{

	layerCount():number {
		return null;
	}

	setCurrent(index:number):void {
	}

	getCurrent():number {
		return null;
	}

	show(index:number):void {
	}

	hide(index:number):void {
	}

	hideAll():void {
	}

	showAll():void {
	}


	remove(index:number):Promise<any> {
		return null;
	}

	addLayer():Promise<any> {
		return null;
	}

	moveTo(index:number):Promise<any> {
		return null;
	}
}