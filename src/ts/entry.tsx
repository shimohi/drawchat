import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FontIcon from 'react-toolbox/lib/font_icon';

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
			<span>
				<FontIcon value='add' />
				<FontIcon value='favorite' />
				<FontIcon>star</FontIcon>
			</span>
		);
	}
}

ReactDOM.render(
	<Root />,
	document.getElementById("root")
);
