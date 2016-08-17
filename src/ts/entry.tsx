import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Card, CardTitle, CardMedia, CardText, CardActions} from "react-toolbox";
import {Button} from "react-toolbox";

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
		return(
			<Card style={{width: '350px'}}>
				<CardTitle
					avatar="https://placeimg.com/80/80/animals"
					title="Avatar style title"
					subtitle="Subtitle here"
				/>
				<CardMedia
					aspectRatio="wide"
					image="https://placeimg.com/800/450/nature"
				/>
				<CardTitle
					title="Title goes here"
					subtitle="Subtitle here"
				/>
				<CardText>test</CardText>
				<CardActions>
					<Button label="Action 1" />
					<Button label="Action 2" />
				</CardActions>
			</Card>
		);
	}
}

ReactDOM.render(
	<Root />,
	document.getElementById("root")
);
