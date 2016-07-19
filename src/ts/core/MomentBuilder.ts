import DrawMomentBuilder = drawchat.core.DrawMomentBuilder;
import {LayerMomentBuilder} from "./LayerMomentBuilder";
import {LayerMoment} from "./LayerMoment";
export class MomentBuilder implements DrawMomentBuilder{

	layerMap:{[key:string]:LayerMoment};
	sequences:string[];
	private history:History;

	constructor(history:History){
		this.history = history;
	}

	putLayerMoment(key:string):drawchat.core.DrawLayerMomentBuilder {
		return new LayerMomentBuilder(key,this);
	}

	setSequence(sequence:string[]):drawchat.core.DrawMomentBuilder {
		this.sequences = sequence;
		return this;
	}

	commit():drawchat.core.DrawMoment {
		return this.history.pushHistory(this.layerMap,this.sequences);
	}
}