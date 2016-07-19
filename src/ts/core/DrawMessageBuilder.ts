import DrawMoment = drawchat.core.DrawMoment;
import Message = drawchat.Message;
import Layer = drawchat.Layer;

export class DrawMessageBuilderStatic {

	createDrawMessage(
		historyNumbers:number[],
		map:{[key:number]:DrawMoment}
	):Message{

		let resultTo:{[key:string]:Layer} = {};
		let sequences:string[];

		for(let historyNumber of historyNumbers){
			let moment = map[historyNumber];
			if(moment.getSequence()){
				sequences = moment.getSequence();
			}
			this.parseMoment(
				resultTo,
				moment
			);
		}

		let layers:Layer[] = [];
		for(let sequence of sequences){
			layers.push(resultTo[sequence]);
		}

		return {
			time:new Date().getTime(),
			canvas:layers
		}
	}

	parseMoment(
		resultTo:{[key:string]:Layer},
		moment:DrawMoment
	):void{

		let keys = moment.getKeys();
		for(let key of keys){
			let layerMoment = moment.getLayerMoment(key);
			let layer:Layer = resultTo[layerMoment.getCanvasId()];
			if(!layer){
				layer = {draws:[]};
			}

			if(layerMoment.getClip()){
				layer.clip = layerMoment.getClip();
			}
			if(layerMoment.getTransform()){
				layer.transform = layerMoment.getTransform();
			}
			if(!layerMoment.getDraws()){
				continue;
			}
			let draws = layerMoment.getDraws();
			for(let draw of draws){
				layer.draws.push(draw);
			}
		}
	}
}
export var DrawMessageBuilder:DrawMessageBuilderStatic = new DrawMessageBuilderStatic();
export default DrawMessageBuilder;