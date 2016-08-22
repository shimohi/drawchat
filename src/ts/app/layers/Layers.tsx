import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './LayersStyle.scss';

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
export class Layers extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.container}>
				<div className={styles.item}>
					<div className={styles.item__del}>
						<span className="material-icons">clear</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__selected}>
						<span className="material-icons">radio_button_checked</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__unselected}>
						<span className="material-icons">radio_button_unchecked</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__unselected}>
						<span className="material-icons">radio_button_unchecked</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__unselected}>
						<span className="material-icons">radio_button_unchecked</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__unselected}>
						<span className="material-icons">radio_button_unchecked</span>
					</div>
				</div>
				<div className={styles.item}>
					<div className={styles.item__add}>
						<span className="material-icons">add</span>
					</div>
				</div>
			</div>
		);
	}
}
