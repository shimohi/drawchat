import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import ClipTransaction = drawchat.updater.ClipTransaction;
import DrawPathTransaction = drawchat.updater.DrawPathTransaction;

import {EditorProperties} from "./EditorProperties";
import {AbstractModeStroke} from "./AbstractModeStroke";

export class ModeStroke extends AbstractModeStroke<DrawPathTransaction>{

	private prop:EditorProperties;

	constructor(
		tran:DrawPathTransaction,
		prop:EditorProperties
	){
		super(tran,prop);
		this.prop = prop;
	}

	protected setProperty(tran: drawchat.updater.DrawPathTransaction): void {
		tran.setStrokeColor(`rgb(${
			this.prop.color.r
		},${
			this.prop.color.g
		},${
			this.prop.color.b
		},${
			this.prop.alpha
		})`);
		tran.setStrokeStyle(
			this.prop.thickness
		);
	}
}

