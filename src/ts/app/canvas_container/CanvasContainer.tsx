import * as React from 'react';
import * as styles from './CanvasContainerStyle.scss';
import DrawchatEditor = drawchat.editor.DrawchatEditor;

class Point{
	x:number;
	y:number;
	constructor(x:number,y:number){
		this.x = x;
		this.y = y;
	}
}

export class CanvasContainerState {
	click:boolean;
	editor:DrawchatEditor;
	mouseMove:(event:MouseEvent)=>void;
	mouseDown:(event:MouseEvent)=>void;
	mouseUp:(event:MouseEvent)=>void;
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
		let element = document.getElementById(this.props.id);

		this.state.mouseMove = (event:MouseEvent)=>{
			if(!this.state.click){
				return;
			}
			let point = this.getOffset(element,event);
			this.props.editor.canvas.touchMove(point.x,point.y);
		};
		this.state.mouseDown = (event:MouseEvent)=>{
			this.state.click = true;
			let point = this.getOffset(element,event);
			this.props.editor.canvas.touchStart(point.x,point.y);
		};
		this.state.mouseUp = (event:MouseEvent)=>{
			this.state.click = false;
			let point = this.getOffset(element,event);
			this.props.editor.canvas.touchEnd(point.x,point.y);
		};
		element.addEventListener('mousemove',this.state.mouseMove);
		element.addEventListener('mousedown',this.state.mouseDown);
		element.addEventListener('mouseup',this.state.mouseUp);
		element.addEventListener('mouseout',this.state.mouseUp);
	}

	componentWillMount(): void {
		this.state.editor.stop();
		let element = document.getElementById(this.props.id);

		if(element == null){
			return;
		}
		element.removeEventListener('mousemove',this.state.mouseMove);
		element.removeEventListener('mousedown',this.state.mouseDown);
		element.removeEventListener('mouseup',this.state.mouseUp);
		element.removeEventListener('mouseout',this.state.mouseUp);
		this.state.mouseMove = null;
		this.state.mouseDown = null;
		this.state.mouseUp = null;
	}

	private getOffset(element:Element,event:MouseEvent):Point{
		let mouseX = event.pageX ;
		let mouseY = event.pageY ;
		let rect = element.getBoundingClientRect() ;
		let positionX = rect.left + window.pageXOffset ;
		let positionY = rect.top + window.pageYOffset ;
		return new Point(
			mouseX - positionX,
			mouseY - positionY
		);
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
