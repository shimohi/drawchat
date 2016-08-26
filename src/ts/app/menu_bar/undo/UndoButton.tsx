import * as React from 'react';
import * as styles from './UndoButtonStyle.scss';

export interface UndoButtonProps {
	action():void;
	disabled:boolean;
}
export class UndoButton extends React.Component<UndoButtonProps, any> {

	constructor(props:UndoButtonProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{
					if(!this.props.disabled){
						this.props.action();
					}
				}} className={this.props.disabled ? styles.item__square_disabled : styles.item__square}>
					<div className={styles.item__square_cell}>
						<span className="material-icons">undo</span>
					</div>
				</div>
			</div>
		);
	}
}

