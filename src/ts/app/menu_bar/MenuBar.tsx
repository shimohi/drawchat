import * as React from 'react';
import * as styles from './MenuBarStyle.scss';
import {RedoButton} from "./redo/RedoButton";
import {UndoButton} from "./undo/UndoButton";
import {SaveButton} from "./save/SaveButton";

export interface MenuBarProps {
	canUndo:boolean;
	canRedo:boolean;
	canSave:boolean;
	undo():void;
	redo():void;
	save():void;
}
export class MenuBar extends React.Component<MenuBarProps, any> {
	constructor(props:MenuBarProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.container}>
				<RedoButton action={()=>{this.props.redo()}} disabled={!this.props.canRedo}/>
				<UndoButton action={()=>{this.props.undo()}} disabled={!this.props.canUndo}/>
				<SaveButton action={()=>{this.props.save()}} disabled={!this.props.canSave}/>
			</div>
		);
	}
}

