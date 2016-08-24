import * as React from 'react';
import * as styles from './ColorPaletteButtonStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class ColorPalette extends React.Component<IMainProps, IMainState> {
	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">palette</span>
					</div>
				</div>
			</div>
		);
	}
}