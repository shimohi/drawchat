import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './entryStyle.scss';
import {Layers} from "./layers/Layers";
import {ModeChanger} from "./mode_changer/ModeChanger";
import {MenuBar} from "./menu_bar/MenuBar";
import CanvasContainer from "./canvas_container/CanvasContainer";
import {ColorSelector} from "./color_selector/ColorSelector";
import DrawchatEditor = drawchat.editor.DrawchatEditor;

export interface EditorRootState {
	editor:DrawchatEditor;
}
export interface EditorRootProps {
	// editor:DrawchatEditor;
}
class EditorRoot extends React.Component<EditorRootProps, EditorRootState> {

	constructor(props:EditorRootProps) {
		super(props);
		this.state = {
			editor:null
		};
	}
	render(){
		let colors = [
			{r:255,g:255,b:0},
			{r:255,g:0,b:255},
			{r:0,g:255,b:255}
		];
		return(
			<div className={styles.container}>
				<div className={styles.canvasContainer}>
					<CanvasContainer />
				</div>
				<div className={styles.menuBar}>
					<MenuBar />
				</div>
				<div className={styles.modeChanger}>
					<ModeChanger changer={this.state.editor.mode} onSelect={(mode:number,thickness:number)=>{

					}}/>
				</div>
				<div className={styles.layers}>
					<Layers />
				</div>
				<div className={styles.colorSelector}>
					<ColorSelector colors={colors} onSelect={(color)=>{

					}}/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<EditorRoot/>,
	document.getElementById("root")
);
