import * as React from 'react';
import * as styles from './LayerRemoveButtonStyle.scss';

export interface LayerRemoveButtonProps {
	action():void;
	disabled:boolean;
}
export class LayerRemoveButton extends React.Component<LayerRemoveButtonProps, any> {
	constructor(props:LayerRemoveButtonProps) {
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
				 		this.props.disabled ? styles.item__del_disabled : styles.item__del
				 	}>
					<span className="material-icons">clear</span>
				</div>
			</div>
		);
	}
}
