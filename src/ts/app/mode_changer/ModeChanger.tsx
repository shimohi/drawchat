import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;
import * as React from 'react';
import * as styles from './ModeChangerStyle.scss';
import {BrushToolButton} from "./brush/BrushToolButton";
import {FillToolButton} from "./fill/FillToolButton";
import {HandToolButton} from "./hand/HandToolButton";
import {TextToolButton} from "./text/TextToolButton";
import {ClipToolButton} from "./clip/ClipToolButton";
import {EyedropperToolButton} from "./eyedropper/EyedropperToolButton";
import {EraserToolButton} from "./eraser/EraserToolButton";

export class ModeItem{
	mode:number;
	thickness:number;
	selected:boolean;
	constructor(mode:number,thickness?:number,selected?:boolean){
		this.mode = mode;
		this.selected = selected;
		this.thickness = thickness;
	}
}

export class ModeChangerState {
	modeItems:ModeItem[];
	constructor(modeItems:ModeItem[]){
		this.modeItems = modeItems;
	}
}
export interface ModeChangerProps{
	changer:DrawchatModeChanger;
	onSelect:ModeChangerHandler;
}
export interface ModeChangerHandler{
	(mode:number,thickness:number):void;
}
export class ModeChanger extends React.Component<ModeChangerProps, ModeChangerState> {

	constructor(props:ModeChangerProps) {
		super(props);
		this.state = new ModeChangerState([
			new ModeItem(props.changer.STROKE_MODE,1),
			new ModeItem(props.changer.STROKE_MODE,12),
			new ModeItem(props.changer.STROKE_MODE,24),
			new ModeItem(props.changer.FILL_MODE),
			new ModeItem(props.changer.HAND_TOOL_MODE),
			new ModeItem(props.changer.TEXT_MODE),
			new ModeItem(props.changer.CLIP_MODE),
			new ModeItem(props.changer.EYEDROPPER_MODE),
			new ModeItem(props.changer.ERASER_MODE,24),
		]);
	}

	onSelect(index:number){
		this.setState(new ModeChangerState(this.state.modeItems.map((item,i)=>{
			return new ModeItem(item.mode,item.thickness,i === index);
		})));
		let selected = this.state.modeItems[index];
		this.props.onSelect(selected.mode,selected.thickness);
	}

	render() {
		return(
			<div className={styles.container}>
				{this.state.modeItems.map((item,i)=>{
					switch (item.mode){
						case this.props.changer.STROKE_MODE:
							return <BrushToolButton key={i} thickness={item.thickness} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.FILL_MODE:
							return <FillToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.HAND_TOOL_MODE:
							return <HandToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.TEXT_MODE:
							return <TextToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.CLIP_MODE:
							return <ClipToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.EYEDROPPER_MODE:
							return <EyedropperToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						case this.props.changer.ERASER_MODE:
							return <EraserToolButton key={i} onSelect={()=>{
								this.onSelect(i);
							}}/>;
						default:
							return null;
					}
				})}
			</div>
		);
	}
}
