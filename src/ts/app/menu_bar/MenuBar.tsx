import * as React from 'react';
import * as styles from './MenuBarStyle.scss';
import {RedoButton} from "./redo/RedoButton";
import {UndoButton} from "./undo/UndoButton";
import {FileUploadButton} from "./file_upload/FileUploadButton";

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class MenuBar extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.container}>
				<RedoButton />
				<UndoButton />
				<FileUploadButton />
			</div>
		);
	}
}

