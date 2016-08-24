import * as React from 'react';
import * as styles from './LayerAddButtonStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class LayerAddButton extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__add}>
					<span className="material-icons">add</span>
				</div>
			</div>
		);
	}
}
