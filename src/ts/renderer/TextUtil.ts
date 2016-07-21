import TextDraw = drawchat.TextDraw;
import Text = drawchat.Text;
import {FillUtil} from "./FillUtil";
import {StrokeUtil} from "./StrokeUtil";
import {TransformContainer} from "./TransformContainer";
import {CompositeOperationUtil} from "./CompositeOperationUtil";
export class TextUtil{

	static renderTextDraw(
		context:CanvasRenderingContext2D,
		transform:TransformContainer,
		textDraw:TextDraw
	):void{
		//transform
		transform.setTransform(context,textDraw.transform);
		//compositeOperation:number;
		CompositeOperationUtil.setCompositeOperation(context,textDraw.compositeOperation);
		//text
		TextUtil.renderText(context,textDraw.text);
	}

	private static renderText(
		context:CanvasRenderingContext2D,
		text:Text
	):void{

		if(!text.text || (!text.fill && !text.stroke)){
			return;
		}
		// fill
		if(text.fill){
			FillUtil.setFill(context,text.fill);
		}
		// stroke
		if(text.stroke){
			StrokeUtil.setStroke(context,text.stroke);
		}
		// align
		context.textAlign = text.align != null ? text.align : 'start';
		// baseline
		context.textBaseline = text.baseline != null ? text.baseline : 'alphabetic';
		// text
		if(text.fill){
			context.fillText(text.text,text.x,text.y);
		}
		if(text.stroke){
			context.strokeText(text.text,text.x,text.y);
		}
	}
}