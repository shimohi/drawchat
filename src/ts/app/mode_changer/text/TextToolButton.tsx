import * as React from 'react';
import * as styles from './TextToolButtonStyle.scss';
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;

export interface TextToolButtonProps {
	key:any;
	editorProperties:DrawchatEditorProperties;
	selected?:boolean;
	onSelect:()=>any;
}
export class TextToolButton extends React.Component<TextToolButtonProps, any> {

	constructor(props:TextToolButtonProps) {
		super(props);
		this.state = {};
	}

	render(){
		let editorProp = this.props.editorProperties;
		let color = editorProp.color;
		let style:any={};
		if(this.props.selected){
			style.color = `rgb(${color.r},${color.g},${color.b})`;
			style.fontSize = editorProp.fontSize;
			style.fontWeight = editorProp.fontWeight;
			// style.textShadow =
			// 	`1px 1px 0px white,-1px 1px 0px white,1px -1px 0px white,-1px -1px 0px white`;
		}
		return(
			<div className={styles.item}>
				<div
					onClick={()=>{this.props.onSelect()}}
					className={this.props.selected ? styles.item__circle_selected : styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span style={style} className="material-icons">text_fields</span>
					</div>
				</div>
			</div>
		);
	}
}
