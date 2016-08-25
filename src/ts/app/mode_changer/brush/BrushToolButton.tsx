import * as React from 'react';
import * as styles from './BrushToolButtonStyle.scss';

export interface BrushToolButtonProps {
	key:any;
	thickness:number;
	selected?:boolean;
	onSelect:()=>any;
}
export class BrushToolButton extends React.Component<BrushToolButtonProps, any> {

	constructor(props:BrushToolButtonProps) {
		super(props);
	}
	render() {
		let style={
			fontSize:this.props.thickness
		};
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.onSelect();}}
					 className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span style={style} className="material-icons">brush</span>
					</div>
				</div>
			</div>
		);
	}
}
