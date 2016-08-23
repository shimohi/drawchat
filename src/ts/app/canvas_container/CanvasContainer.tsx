import * as React from 'react';
import * as styles from './CanvasContainerStyle.scss';

interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}
interface IMainProps {}

export class CanvasContainer extends React.Component<IMainProps, IMainState> {
	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.container}>
				<div className={styles.container__background}>
					<canvas />
				</div>
			</div>
		);
	}
}
export default CanvasContainer;
