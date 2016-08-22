import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './entryStyle.scss';
import {Layers} from "./layers/Layers";
import {ModeChanger} from "./mode_changer/ModeChanger";
import {MenuBar} from "./menu_bar/MenuBar";
import CanvasContainer from "./canvas_container/CanvasContainer";
import {ColorSelector} from "./color_selector/ColorSelector";

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
class Root extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}

	render() {
		var divStyle = {
			'fontSize': '48px'
		};
		return(
			<div className={styles.container}>
				<div className={styles.canvasContainer}>
					<CanvasContainer />
				</div>
				<div className={styles.menuBar}>
					<MenuBar />
				</div>
				<div className={styles.modeChanger}>
					<ModeChanger />
				</div>
				<div className={styles.layers}>
					<Layers />
				</div>
				<div className={styles.colorSelector}>
					<ColorSelector />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Root/>,
	document.getElementById("root")
);
