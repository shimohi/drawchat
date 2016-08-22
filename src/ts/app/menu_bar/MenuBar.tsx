import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './MenuBarStyle.scss';

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
				<div className={styles.item}>
					<div className={styles.item__square}>
						<div className={styles.item__square_cell}>
							<span className="material-icons">redo</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__square}>
						<div className={styles.item__square_cell}>
							<span className="material-icons">undo</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__square}>
						<div className={styles.item__square_cell}>
							<span className="material-icons">file_upload</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

