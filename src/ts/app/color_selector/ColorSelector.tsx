import * as React from 'react';
import * as styles from './ColorSelectorStyle.scss';
import {ColorItem} from "./color_item/ColorItem";
import {ColorPalette} from "./color_palette/ColorPaletteButton";
import Color = drawchat.editor.Color;

export class ColorValue{
	color:Color;
	selected:boolean;
	constructor(color?:Color,selected?:boolean){
		this.color = color;
		this.selected = selected;
	}
}
export class ColorSelectorState{
	colors:ColorValue[];
	palette:any;
	constructor(
		colors:ColorValue[],
		palette?:any
	){
		this.colors = colors;
		this.palette = palette;
	}
}
export interface ColorSelectorProps {
	onSelect:SelectColorHandler;
	colors:Color[];
	selectedIndex?:number;
}
export interface SelectColorHandler {
	(color:Color):void;
}

export class ColorSelector extends React.Component<ColorSelectorProps, ColorSelectorState> {
	constructor(props:ColorSelectorProps) {
		super(props);
		this.state = new ColorSelectorState(props.colors.map((color,i)=>{
			return new ColorValue(color,props.selectedIndex === i);
		}));
	}
	selectColor(color:Color,index:number):void{
		this.setState(new ColorSelectorState(
			this.state.colors.map((colorValue,i)=>{
				return new ColorValue(colorValue.color,i === index);
			})
		));
		this.props.onSelect(color);
	}
	render() {
		return(
			<div className={styles.container}>
				{this.state.colors.map((colorValue,index)=>{
					return <ColorItem key={index} color={colorValue.color} selected={colorValue.selected} onSelect={()=>{
						this.selectColor(colorValue.color,index);
					}}/>
				})}
				{/*<ColorPalette />*/}
			</div>
		);
	}
}
