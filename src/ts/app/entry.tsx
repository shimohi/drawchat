import DrawchatEditor = drawchat.editor.DrawchatEditor;
import Color = drawchat.editor.Color;
import DrawchatLayers = drawchat.editor.DrawchatLayers;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './entryStyle.scss';
import {MenuBar} from "./menu_bar/MenuBar";
import CanvasContainer from "./canvas_container/CanvasContainer";
import {ColorSelector} from "./color_selector/ColorSelector";
import {ModeChanger} from "./mode_changer/ModeChanger";
import {Layers} from "./layers/Layers";
import Renderer from "../renderer/MultiCanvas2DRenderer";
import {History} from "../core/History";
import {Editor} from "../editor/Editor";

export class EditorRootState {
	editor:DrawchatEditor;
	colors:Color[];
	// get layers():DrawchatLayers{
	// 	return this.editor.layers;
	// }
	// get editorProps():DrawchatEditorProperties{
	// 	return this.editor.properties;
	// }
	// get modeChanger():DrawchatModeChanger{
	// 	return this.editor.mode;
	// }
	constructor(editor:DrawchatEditor){
		this.editor = editor;
		this.colors = [
			{r:255,g:255,b:0},
			{r:255,g:0,b:255},
			{r:0,g:255,b:255}
		];
	}
}
export interface EditorRootProps {
	editor:DrawchatEditor;
}
class EditorRoot extends React.Component<EditorRootProps, EditorRootState> {
	constructor(props:EditorRootProps) {
		super(props);
		this.state = new EditorRootState(props.editor);
	}
	refresh():void{
		this.setState(this.state);
	}
	render(){
		return(
			<div className={styles.container}>
				<div className={styles.canvasContainer}>
					<CanvasContainer id='editorCanvas' editor={this.state.editor}/>
				</div>
				<div className={styles.menuBar}>
					<MenuBar
						canRedo={
							this.state.editor.canRedo()
						}
						canUndo={
							this.state.editor.canUndo()
						}
						canSave={true}
						undo={()=>{
							this.state.editor.undo();
							this.refresh();
						}}
						redo={()=>{
							this.state.editor.redo();
							this.refresh();
						}}
						save={()=>{
							//	未実装
						}}
					/>
				</div>
				<div className={styles.modeChanger}>
					<ModeChanger
						changer={
							this.state.editor.mode
						} onSelect={(mode:number,thickness:number)=>{
							this.state.editor.mode.changeMode(mode);
							this.state.editor.properties.thickness = thickness;
							this.refresh();
						}}
					/>
				</div>
				<div className={styles.layers}>
					<Layers
						selected={(()=>{
							return this.state.editor.layers.getCurrent()
						})()}
						count={
							this.state.editor.layers.layerCount()
						}
						canAdd={
							this.state.editor.layers.layerCount() < 10
						}
						canRemove={
							this.state.editor.layers.getCurrent() >= 0
						&& 	this.state.editor.layers.getCurrent() < this.state.editor.layers.layerCount()
						}
						add={()=>{
							this.state.editor.layers.addLayer();
							this.refresh();
						}}
						select={(i:number)=>{
							this.state.editor.layers.setCurrent(i);
							this.refresh();
						}}
						remove={(i:number)=>{
							this.state.editor.layers.remove(i);
							this.refresh();
						}}
					/>
				</div>
				<div className={styles.colorSelector}>
					<ColorSelector
						colors={
							this.state.colors
						}
						onSelect={(color)=>{
                        	this.state.editor.properties.color = color;
                        	this.refresh();
						}}
					/>
				</div>
			</div>
		);
	}
}

const history = new History();
const renderer = Renderer.createInstance('editorCanvas',200,200);
const editor = new Editor(history,renderer);

ReactDOM.render(
	<EditorRoot editor={editor}/>,
	document.getElementById("root")
);
