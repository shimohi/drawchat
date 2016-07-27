import DrawchatUpdator = drawchat.updator.DrawchatUpdator;
import DrawHistory = drawchat.core.DrawHistory;
export class Updator implements DrawchatUpdator{

	private history:DrawHistory;

	addLayer():string {
		let moment = this.history.addLayer({draws:[]});
		return moment.getKeys()[0];
	}

	removeLayer(layerId:string):void {
		this.history.removeLayer(layerId);
	}

	getLayers():string[] {
		return this.history.getLayers();
	}

	beginTransform():drawchat.updator.TransformTransaction {
		return null;
	}

	beginClip(layerId:string):drawchat.updator.ClipTransaction {
		return null;
	}

	beginPath(layerId:string):drawchat.updator.PathTransaction {
		return null;
	}

	beginText(layerId:string):drawchat.updator.TextTransaction {
		return null;
	}

	beginChangeSequence(layerId:string):drawchat.updator.ChangeSequenceTransaction {
		return null;
	}

	canUndo():boolean {
		return null;
	}

	canRedo():boolean {
		return null;
	}

	undo():void {
	}

	redo():void {
	}
}