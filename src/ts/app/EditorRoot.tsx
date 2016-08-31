import DrawchatEditor = drawchat.editor.DrawchatEditor;
import Color = drawchat.editor.Color;
import DrawchatLayers = drawchat.editor.DrawchatLayers;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;

import * as React from 'react';
import * as styles from './EditorRootStyle.scss';
import {MenuBar} from "./menu_bar/MenuBar";
import CanvasContainer from "./canvas_container/CanvasContainer";
import {ColorSelector} from "./color_selector/ColorSelector";
import {ModeChanger, ModeItem} from "./mode_changer/ModeChanger";
import {Layers} from "./layers/Layers";

export class EditorRootState {
	editor:DrawchatEditor;
	colors:Color[];
	modeItems:ModeItem[];
	latest:number;
	constructor(editor:DrawchatEditor){
		this.editor = editor;
		this.latest = -1;
		this.colors = [
			{r:255,g:255,b:0},
			{r:255,g:0,b:255},
			{r:0,g:255,b:255}
		];
		this.modeItems = [
			new ModeItem(editor.mode.STROKE_MODE,1),
			new ModeItem(editor.mode.STROKE_MODE,12),
			new ModeItem(editor.mode.STROKE_MODE,24),
			new ModeItem(editor.mode.FILL_MODE),
			new ModeItem(editor.mode.HAND_TOOL_MODE),
			new ModeItem(editor.mode.TEXT_MODE),
			new ModeItem(editor.mode.CLIP_MODE),
			new ModeItem(editor.mode.EYEDROPPER_MODE),
			new ModeItem(editor.mode.ERASER_MODE,24),
		];
	}
}

export interface EditorRootProps {
	editor:DrawchatEditor;
}
export class EditorRoot extends React.Component<EditorRootProps, EditorRootState> {
	constructor(props:EditorRootProps) {
		super(props);
		this.state = new EditorRootState(props.editor);
	}

	/**
	 * プロパティの補完
	 * @returns {boolean}
	 */
	private complementProps():boolean{
		let layers = this.state.editor.layers;
		let count = layers.layerCount();
		let current = layers.getCurrent();
		if(count === 0){
			layers.addLayer().then(()=>{
				this.refresh();
			});
			return true;
		}
		if(layers.getCurrent() >= 0){
			this.state.latest = current;
			return this.complementMode();
		}
		if(this.state.latest >= 0 && this.state.latest < count){
			layers.setCurrent(this.state.latest);
			this.refresh();
			return true;
		}
		this.state.latest = count - 1;
		layers.setCurrent(count - 1);
		this.refresh();
		return true;
	}

	private complementMode():boolean{
		if(this.state.editor.mode.getMode() >= 0){
			return false;
		}
		this.modeSelect(0);
		return true;
	}

	/**
	 * 画面リフレッシュ
	 */
	refresh():void{
		if(!this.complementProps()){
			this.setState(this.state);
		}
	}
	/**
	 * コンポーネントマウント時の処理
	 */
	componentDidMount(): void {
		this.complementProps();
	}
	modeSelect(index:number):void{
		this.state.modeItems = this.state.modeItems.map((item,i)=>{
			return new ModeItem(item.mode,item.thickness,i === index);
		});
		let selected = this.state.modeItems[index];
		this.state.editor.mode.changeMode(selected.mode).then(()=>{
			this.state.editor.properties.thickness = selected.thickness;
			this.refresh();
		});
	}

	render(){
		let count = this.state.editor.layers.layerCount();
		let current = this.state.editor.layers.getCurrent();
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
						canSave={false}
						undo={()=>{
							this.state.editor.undo().then(()=>{
								this.refresh();
							});
						}}
						redo={()=>{
							this.state.editor.redo().then(()=>{
								this.refresh();
							});
						}}
						save={()=>{
							//	未実装
						}}
					/>
				</div>
				<div className={styles.modeChanger}>
					<ModeChanger
						editorProperties={this.props.editor.properties}
						modeItems={
							this.state.modeItems
						}
						changer={
							this.state.editor.mode
						} onSelect={(index:number)=>{
							this.modeSelect(index);
						}}
					/>
				</div>
				<div className={styles.layers}>
					<Layers
						selected={current}
						count={count}
						canAdd={count < 10}
						canRemove={current >= 0 && 	current < count}
						add={()=>{
							this.state.editor.layers.addLayer().then(()=>{
								this.refresh();
							});
						}}
						select={(i:number)=>{
							this.state.editor.layers.setCurrent(i);
							this.refresh();
						}}
						remove={(i:number)=>{
							this.state.editor.layers.remove(i).then(()=>{
								this.refresh();
							});
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
