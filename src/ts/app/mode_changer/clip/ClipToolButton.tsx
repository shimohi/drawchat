import * as React from 'react';
import * as styles from './ClipToolButtonStyle.scss';

export interface ClipToolButtonProps {
	key:any;
	selected?:boolean;
	onSelect:()=>any;
}
export class ClipToolButton extends React.Component<ClipToolButtonProps, any> {

	constructor(props:ClipToolButtonProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect()}}
					 className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">crop_free</span>
					</div>
				</div>
			</div>
		);
	}
}
