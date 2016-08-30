import * as React from 'react';
import * as styles from './SaveButtonStyle.scss';

export interface SaveButtonProps {
	action():void;
	disabled?:boolean;
}
export class SaveButton extends React.Component<SaveButtonProps, any> {

	constructor(props:SaveButtonProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{
					if(!this.props.disabled){
						this.props.action();
					}
				}} className={
					this.props.disabled ? styles.item__square_disabled : styles.item__square
				}>
					<div className={styles.item__square_cell}>
						<span className="material-icons">file_upload</span>
					</div>
				</div>
			</div>
		);
	}
}

