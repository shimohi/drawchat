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
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;

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
export interface ModeChangerProps{
	modeItems:ModeItem[];
	editorProperties:DrawchatEditorProperties;
	changer:DrawchatModeChanger;
	onSelect:ModeChangerHandler;
}
export interface ModeChangerHandler{
	(index:number):void;
}
export class ModeChanger extends React.Component<ModeChangerProps, any> {

	constructor(props:ModeChangerProps) {
		super(props);
	}

	render() {
		return(
			<div className={styles.container}>
				{this.props.modeItems.map((item,i)=>{
					switch (item.mode){
						case this.props.changer.STROKE_MODE:
							return <BrushToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								thickness={item.thickness}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.FILL_MODE:
							return <FillToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.HAND_TOOL_MODE:
							return <HandToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.TEXT_MODE:
							return <TextToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.CLIP_MODE:
							return <ClipToolButton
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.EYEDROPPER_MODE:
							return <EyedropperToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						case this.props.changer.ERASER_MODE:
							return <EraserToolButton
								editorProperties={this.props.editorProperties}
								key={i}
								selected={item.selected}
								onSelect={()=>{
									this.props.onSelect(i);
								}}
							/>;
						default:
							return null;
					}
				})}
			</div>
		);
	}
}
