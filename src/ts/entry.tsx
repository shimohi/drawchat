import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './entry.scss';

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
	}

	render() {
		var divStyle = {
			'fontSize': '48px'
		};
		return(
			<div className={styles.container}>
				<div className={styles.canvasContainer}>
					<div className={styles.canvasContainer__background}>
						<canvas />
					</div>
				</div>
				<div className={styles.menuBar}>
					<div className={styles.menuBar__item}>
						<div className={styles.menuBar__item_square}>
							<div className={styles.menuBar__item_cell}>
								<span className="material-icons">redo</span>
							</div>
						</div>
					</div>
					<div className={styles.menuBar__item}>
						<div className={styles.menuBar__item_square}>
							<div className={styles.menuBar__item_cell}>
								<span className="material-icons">undo</span>
							</div>
						</div>
					</div>
					<div className={styles.menuBar__item}>
						<div className={styles.menuBar__item_square}>
							<div className={styles.menuBar__item_cell}>
								<span className="material-icons">file_upload</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.modeChanger}>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">brush</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">brush</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">brush</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">format_paint</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">pan_tool</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">text_fields</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">crop_free</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">colorize</span>
							</div>
						</div>
					</div>
					<div className={styles.modeChanger__item}>
						<div className={styles.modeChanger__item_circle}>
							<div className={styles.modeChanger__item_cell}>
								<span className="material-icons">panorama_fish_eye</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.layers}>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_del}>
							<span className="material-icons">clear</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_selected}>
							<span className="material-icons">radio_button_checked</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_unselected}>
							<span className="material-icons">radio_button_unchecked</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_unselected}>
							<span className="material-icons">radio_button_unchecked</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_unselected}>
							<span className="material-icons">radio_button_unchecked</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_unselected}>
							<span className="material-icons">radio_button_unchecked</span>
						</div>
					</div>
					<div className={styles.layers__item}>
						<div className={styles.layers__item_add}>
							<span className="material-icons">add</span>
						</div>
					</div>
				</div>
				<div className={styles.colorSelector}>
					<div className={styles.colorSelector__item}>
						<div className={styles.colorSelector__item_circle}>
							<div className={styles.colorSelector__item_cell}>
								<span className="material-icons">format_color_fill</span>
							</div>
						</div>
					</div>
					<div className={styles.colorSelector__item}>
						<div className={styles.colorSelector__item_circle}>
							<div className={styles.colorSelector__item_cell}>
								<span className="material-icons">format_color_fill</span>
							</div>
						</div>
					</div>
					<div className={styles.colorSelector__item}>
						<div className={styles.colorSelector__item_circle}>
							<div className={styles.colorSelector__item_cell}>
								<span className="material-icons">format_color_fill</span>
							</div>
						</div>
					</div>
					<div className={styles.colorSelector__item}>
						<div className={styles.colorSelector__item_circle}>
							<div className={styles.colorSelector__item_cell}>
								<span className="material-icons">palette</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			// <Layout>
			// 	<Panel>
			// 		<List>
			// 			<ListItem leftIcon='brush' />
			// 			<ListItem leftIcon='brush' />
			// 			<ListItem leftIcon='brush' />
			// 			<ListItem leftIcon='format_color_fill' />
			// 			<ListItem leftIcon='text_fields' />
			// 			<ListItem leftIcon='crop_free' />
			// 			<ListItem leftIcon='colorize' />
			// 			<ListItem leftIcon='panorama_fish_eye' />
			// 		</List>
			// 	</Panel>
			// 	<Panel>
			// 		aaaaa
			// 	</Panel>
			// 	<Sidebar pinned={true}>
			// 	</Sidebar>
			// </Layout>
			// <Card style={{width: '350px'}}>
			// 	<CardTitle
			// 		avatar="https://placeimg.com/80/80/animals"
			// 		title="Avatar style title"
			// 		subtitle="Subtitle here"
			// 	/>
			// 	<CardMedia
			// 		aspectRatio="wide"
			// 		{/*image="https://placeimg.com/800/450/nature"*/}
			// 	{/*/>*/}
			// 	<CardTitle
			// 		title="Title goes here"
			// 		subtitle="Subtitle here"
			// 	/>
			// 	<CardText>test</CardText>
			// 	<CardActions>
			// 		<Button label="Action 1" />
			// 		<Button label="Action 2" />
			// 	</CardActions>
			// </Card>
		);
	}

	// render() {
	// 	var divStyle = {
	// 		'fontSize': '48px'
	// 	};
	// 	return(
	// 		<Layout>
	// 			<Panel>
	// 				<List>
	// 					<ListItem leftIcon='brush' />
	// 					<ListItem leftIcon='brush' />
	// 					<ListItem leftIcon='brush' />
	// 					<ListItem leftIcon='format_color_fill' />
	// 					<ListItem leftIcon='text_fields' />
	// 					<ListItem leftIcon='crop_free' />
	// 					<ListItem leftIcon='colorize' />
	// 					<ListItem leftIcon='panorama_fish_eye' />
	// 				</List>
	// 			</Panel>
	// 			<Panel>
	// 				aaaaa
	// 			</Panel>
	// 			<Sidebar pinned={true}>
	// 			</Sidebar>
	// 		</Layout>
	// 		// <Card style={{width: '350px'}}>
	// 		// 	<CardTitle
	// 		// 		avatar="https://placeimg.com/80/80/animals"
	// 		// 		title="Avatar style title"
	// 		// 		subtitle="Subtitle here"
	// 		// 	/>
	// 		// 	<CardMedia
	// 		// 		aspectRatio="wide"
	// 		// 		{/*image="https://placeimg.com/800/450/nature"*/}
	// 		// 	{/*/>*/}
	// 		// 	<CardTitle
	// 		// 		title="Title goes here"
	// 		// 		subtitle="Subtitle here"
			/*// 	/>*/
			/*// 	<CardText>test</CardText>*/
	// 		// 	<CardActions>
	// 		// 		<Button label="Action 1" />
	// 		// 		<Button label="Action 2" />
	// 		// 	</CardActions>
	// 		// </Card>
	// 	);
	// }
}

ReactDOM.render(
	<Root/>,
	document.getElementById("root")
);
