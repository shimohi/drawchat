import * as React from 'react';
import * as styles from './ModeChangerStyle.scss';
import {BrushToolButton} from "./brush/BrushToolButton";
import {FillToolButton} from "./fill/FillToolButton";
import {HandToolButton} from "./hand/HandToolButton";
import {TextToolButton} from "./text/TextToolButton";
import {ClipToolButton} from "./clip/ClipToolButton";
import {EyedropperToolButton} from "./eyedropper/EyedropperToolButton";
import {EraserToolButton} from "./eraser/EraserToolButton";

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class ModeChanger extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div className={styles.container}>
				<BrushToolButton />
				<BrushToolButton />
				<BrushToolButton />
				<FillToolButton />
				<HandToolButton />
				<TextToolButton />
				<ClipToolButton />
				<EyedropperToolButton />
				<EraserToolButton />
			</div>
		);
	}
}
