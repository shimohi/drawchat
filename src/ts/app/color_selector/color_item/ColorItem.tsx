import * as React from 'react';
import * as styles from './ColorItemStyle.scss';
import Color = drawchat.editor.Color;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;

export interface ColorItemProps{
	key:number;
	color:Color;
	onSelect:SelectColorHandler;
	selected?:boolean;
}
export interface ColorItemState{
}
export interface SelectColorHandler{
	():void;
}

export class ColorItem extends React.Component<ColorItemProps, ColorItemState> {

	constructor(props:ColorItemProps) {
		super(props);
		this.state = {
			onSelect:props.onSelect
		};
	}
	// componentDidMount(){
	// }

	selectColor(
		// e:React.SyntheticEvent
	):void{
		this.props.onSelect();
	}

	private getColor(){
		return this.props.color ? this.props.color :{r:0,g:0,b:0};
	}

	render(){
		let color = this.getColor();
		var spanStyle= {
			color:`rgb(${color.r},${color.g},${color.b})`
		};
		return(
			<div className={styles.item}>
				<div  onClick={(event) => this.selectColor()} className={
					this.props.selected ? styles.item__circle_selected + ' ' + styles.item__circle : styles.item__circle
				}>
					<div className={styles.item__circle_cell}>
						<span className="material-icons" style={spanStyle}>format_color_fill</span>
					</div>
				</div>
			</div>
		);
	}
}
