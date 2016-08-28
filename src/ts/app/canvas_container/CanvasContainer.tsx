import * as React from 'react';
import * as styles from './CanvasContainerStyle.scss';
import DrawchatEditor = drawchat.editor.DrawchatEditor;

export class CanvasContainerState {
	editor:DrawchatEditor;
	constructor(editor:DrawchatEditor){
		this.editor = editor;
	}
}
export interface CanvasContainerProps {
	id:string;
	editor:DrawchatEditor;
}
export class CanvasContainer extends React.Component<CanvasContainerProps, CanvasContainerState> {
	constructor(props:CanvasContainerProps) {
		super(props);
		this.state = new CanvasContainerState(props.editor);
	}

	componentDidMount(): void {
		this.state.editor.reRender();
		this.state.editor.start();
	}
	componentWillMount(): void {
		this.state.editor.stop();
	}

	render() {
		let style={
			width:this.props.editor.getWidth(),
			height:this.props.editor.getHeight()
		};
		return(
			<div className={styles.container}>
				<div style={style} className={styles.container__background}>
					<div style={style} id={this.props.id} className={styles.container__canvas} />
				</div>
			</div>
		);
	}
}
export default CanvasContainer;
