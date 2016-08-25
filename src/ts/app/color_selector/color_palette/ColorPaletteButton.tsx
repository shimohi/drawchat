import * as React from 'react';
import * as styles from './ColorPaletteButtonStyle.scss';

export class ColorPalette extends React.Component<any, any> {
	constructor(props:any) {
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
