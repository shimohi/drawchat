import * as React from 'react';
import * as styles from './LayersStyle.scss';
import {LayerRemoveButton} from "./remove/LayerRemoveButton";
import {LayerTab} from "./layer/LayerTab";
import {LayerAddButton} from "./add/LayerAddButton";

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class Layers extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.container}>
				<LayerRemoveButton />
				<LayerTab />
				<LayerTab />
				<LayerTab />
				<LayerTab />
				<LayerAddButton />
			</div>
		);
	}
}
