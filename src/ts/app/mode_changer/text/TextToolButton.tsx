import * as React from 'react';
import * as styles from './TextToolButtonStyle.scss';

export interface TextToolButtonProps {
	key:any;
	selected?:boolean;
	onSelect:()=>any;
}
export class TextToolButton extends React.Component<TextToolButtonProps, any> {

	constructor(props:TextToolButtonProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect()}}
					className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons">text_fields</span>
					</div>
				</div>
			</div>
		);
	}
}
