import * as React from 'react';
import * as styles from './LayerAddButtonStyle.scss';

export interface LayerAddButtonProps {
	action():void;
	disabled:boolean;
}
export class LayerAddButton extends React.Component<LayerAddButtonProps, any> {
	constructor(props:LayerAddButtonProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div
					onClick={()=>{
						if(!this.props.disabled){
							this.props.action();
						}
					}}
					className={
						this.props.disabled ? styles.item__add_disabled : styles.item__add
					}>
					<span className="material-icons">add</span>
				</div>
			</div>
		);
	}
}
