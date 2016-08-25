import * as React from 'react';
import * as styles from './HandToolButtonStyle.scss';


export interface HandToolButtonProps {
	key:any;
	selected?:boolean;
	onSelect:()=>any;
}
export class HandToolButton extends React.Component<HandToolButtonProps, any> {

	constructor(props:HandToolButtonProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect()}}
					className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">pan_tool</span>
					</div>
				</div>
			</div>
		);
	}
}
