import * as React from 'react';
import * as styles from './ColorItemStyle.scss';
import Color = drawchat.editor.Color;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;

export interface ColorItemProps{
	color:Color;
	onSelect:SelectColorHandler
}
export interface SelectColorHandler{
	(color:Color):void;
}

export class ColorItem extends React.Component<ColorItemProps, ColorItemProps> {

	constructor(props:ColorItemProps) {
		super(props);
		this.state = props;
	}

	// componentDidMount(){
	// }

	selectColor(
		// e:React.SyntheticEvent
	):void{
		if(!this.state.onSelect){
			return;
		}
		this.state.onSelect(this.state.color);
	}

	render(){
		let color = this.state.color ? this.state.color :{r:0,g:0,b:0};
		var spanStyle= {
			color:`rgb(${color.r},${color.g},${color.b})`
		};
		return(
			<div className={styles.item}>
				<div  onClick={(event) => this.selectColor()} className={styles.item__circle}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons" style={spanStyle}>format_color_fill</span>
					</div>
				</div>
			</div>
		);
	}
}
