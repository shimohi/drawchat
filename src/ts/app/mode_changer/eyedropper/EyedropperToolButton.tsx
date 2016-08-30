import * as React from 'react';
import * as styles from './EyedropperToolButtonStyle.scss';
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;

export interface EyedropperToolButtonState {
}
export interface EyedropperToolButtonProps {
	key:any;
	editorProperties:DrawchatEditorProperties;
	selected?:boolean;
	onSelect:()=>any;
}
export class EyedropperToolButton extends React.Component<EyedropperToolButtonProps, EyedropperToolButtonState> {

	constructor(props:EyedropperToolButtonProps){
		super(props);
		this.state = {};
	}

	render() {
		let color = this.props.editorProperties.color;
		let style:any={};
		if(this.props.selected){
			style.color = `rgb(${color.r},${color.g},${color.b})`;
			// style.textShadow =
			// 	`1px 1px 0px white,-1px 1px 0px white,1px -1px 0px white,-1px -1px 0px white`;
		}
		return(
			<div className={styles.item}>
				<div
					onClick={()=>{this.props.onSelect()}}
					 className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span style={style} className="material-icons">colorize</span>
					</div>
				</div>
			</div>
		);
	}
}
