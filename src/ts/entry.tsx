import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FontIcon from 'react-toolbox/lib/font_icon';

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


			<span>
    			<FontIcon style={divStyle} value='brush' />
    			<FontIcon value='brush' />
    			<FontIcon value='brush' />
    			<FontIcon value='format_color_fill' />
    			<FontIcon value='text_fields' />
    			<FontIcon value='brush' />
    			<FontIcon value='crop_free' />
    			<FontIcon value='colorize' />
    			<FontIcon value='panorama_fish_eye' />
    			<FontIcon>star</FontIcon>
  			</span>
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
}

ReactDOM.render(
	<Root />,
	document.getElementById("root")
);
