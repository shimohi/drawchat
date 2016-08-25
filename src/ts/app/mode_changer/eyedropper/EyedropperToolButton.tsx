import * as React from 'react';
import * as styles from './EyedropperToolButtonStyle.scss';

export interface EyedropperToolButtonState {
}
export interface EyedropperToolButtonProps {
	key:any;
	selected?:boolean;
	onSelect:()=>any;
}
export class EyedropperToolButton extends React.Component<EyedropperToolButtonProps, EyedropperToolButtonState> {

	constructor(props:EyedropperToolButtonProps){
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect()}}
					 className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">colorize</span>
					</div>
				</div>
			</div>
		);
	}
}
