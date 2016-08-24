import * as React from 'react';
import * as styles from './LayerRemoveButtonStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class LayerRemoveButton extends React.Component<IMainProps, IMainState> {
	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__del}>
					<span className="material-icons">clear</span>
				</div>
			</div>
		);
	}
}
