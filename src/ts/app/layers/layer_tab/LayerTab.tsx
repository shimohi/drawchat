import * as React from 'react';
import * as styles from './LayerTabStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class LayerTab extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__selected}>
					<span className="material-icons">radio_button_checked</span>
				</div>
			</div>
				// <div className={styles.item}>
				// 	<div className={styles.item__unselected}>
				// 		<span className="material-icons">radio_button_unchecked</span>
				// 	</div>
				// </div>
		);
	}
}
