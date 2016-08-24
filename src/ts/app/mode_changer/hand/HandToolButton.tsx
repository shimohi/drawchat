import * as React from 'react';
import * as styles from './HandToolButtonStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class HandToolButton extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">pan_tool</span>
					</div>
				</div>
			</div>
		);
	}
}
