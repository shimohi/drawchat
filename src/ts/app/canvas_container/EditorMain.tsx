import * as React from 'react';
import * as styles from './EditorMainStyle.scss';
import DrawchatEditor = drawchat.editor.DrawchatEditor;

class Point{
	x:number;
	y:number;
	constructor(x:number,y:number){
		this.x = x;
		this.y = y;
	}
}

export class EditorMainState{
	click:boolean;
	moving:boolean;
	editor:DrawchatEditor;
	mouseOut:(event:MouseEvent)=>void;
	mouseMove:(event:MouseEvent)=>void;
	mouseDown:(event:MouseEvent)=>void;
	mouseUp:(event:MouseEvent)=>void;
	constructor(editor:DrawchatEditor){
		this.editor = editor;
	}
}
export interface EditorMainProps {
	id:string;
	editor:DrawchatEditor;
}
export class EditorMain extends React.Component<EditorMainProps, EditorMainState> {
	constructor(props:EditorMainProps) {
		super(props);
		this.state = new EditorMainState(props.editor);
	}

	componentDidMount(): void {
		this.state.editor.reRender();
		this.state.editor.start();
		let element = document.getElementById(this.props.id);

		this.state.mouseMove = (event:MouseEvent)=>{
			if(!this.state.click){
				return;
			}
			this.state.moving = true;
			let point = this.getOffset(element,event);
			this.props.editor.canvas.touchMove(point.x,point.y);
		};
		this.state.mouseDown = (event:MouseEvent)=>{
			this.state.click = true;
			let point = this.getOffset(element,event);
			this.props.editor.canvas.touchStart(point.x,point.y);
		};
		this.state.mouseUp = (event:MouseEvent)=>{
			this.drop(element,event);
		};
		this.state.mouseOut = (event:MouseEvent)=>{
			if(!this.state.moving){
				return;
			}
			this.drop(element,event);
		};
		element.addEventListener('mousemove',this.state.mouseMove);
		element.addEventListener('mousedown',this.state.mouseDown);
		document.addEventListener('mouseup',this.state.mouseUp);
		element.addEventListener('mouseout',this.state.mouseOut);
	}

	private getCursor():string{

		let mode = this.state.editor.mode;
		switch (mode.getMode()){
			case mode.CHANGING:
				return "wait";
			case mode.CLIP_MODE:
				return "url(http://test.png),crosshair";
			case mode.ERASER_MODE:
				return "url(http://test.png),default";
			case mode.EYEDROPPER_MODE:
				return "url(http://test.png),default";
			case mode.FILL_MODE:
				return "url(http://test.png),default";
			case mode.TEXT_MODE:
				return "url(http://test.png),text";
			case mode.STROKE_MODE:
				return "url(http://test.png),default";
			case mode.HAND_TOOL_MODE:
				return "url(http://test.png),move";
			default:
				return "auto";
		}
	}

	private drop(element:Element,event:MouseEvent){
		this.state.click = false;
		this.state.moving = false;
		let point = this.getOffset(element,event);
		this.props.editor.canvas.touchEnd(point.x,point.y);
	}

	componentWillMount(): void {
		this.state.editor.stop();
		let element = document.getElementById(this.props.id);

		if(element == null){
			return;
		}
		element.removeEventListener('mousemove',this.state.mouseMove);
		element.removeEventListener('mousedown',this.state.mouseDown);
		document.removeEventListener('mouseup',this.state.mouseUp);
		element.removeEventListener('mouseout',this.state.mouseOut);
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
			height:this.props.editor.getHeight(),
			cursor:this.getCursor()
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
export default EditorMain;
