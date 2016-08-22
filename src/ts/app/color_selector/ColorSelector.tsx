import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './ColorSelectorStyle.scss';

// import FontIcon from 'react-toolbox/lib/font_icon';
// import {Layout, NavDrawer, Panel, Sidebar, List, ListItem} from "react-toolbox";

// import {Card, CardTitle, CardMedia, CardText, CardActions} from "react-toolbox";
// import {Button} from "react-toolbox";

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class ColorSelector extends React.Component<IMainProps, IMainState> {

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
							<span className="material-icons">format_color_fill</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">format_color_fill</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">format_color_fill</span>
						</div>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__circle}>
						<div className={styles.item__circle_cell}>
							<span className="material-icons">palette</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
