import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './ModeChangerStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class ModeChanger extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.container}>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">brush</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">brush</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">brush</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">format_paint</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">pan_tool</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">text_fields</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">crop_free</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">colorize</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">panorama_fish_eye</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
