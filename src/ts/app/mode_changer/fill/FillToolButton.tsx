import * as React from 'react';
import * as styles from './FillToolButtonStyle.scss';

export interface FillToolButtonProps {
	key:any;
	selected?:boolean;
	onSelect:()=>any;
}
export class FillToolButton extends React.Component<FillToolButtonProps, any> {

	constructor(props:FillToolButtonProps) {
		super(props);
	}

	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect()}}
					className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">format_paint</span>
					</div>
				</div>
			</div>
		);
	}
}
