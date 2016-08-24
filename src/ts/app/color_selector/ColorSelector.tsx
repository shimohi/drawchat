import * as React from 'react';
import * as styles from './ColorSelectorStyle.scss';
import {ColorItem} from "./color_item/ColorItem";
import {ColorPalette} from "./color_palette/ColorPaletteButton";

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class ColorSelector extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.container}>
				<ColorItem />
				<ColorItem />
				<ColorItem />
				<ColorPalette />
			</div>
		);
	}
}
