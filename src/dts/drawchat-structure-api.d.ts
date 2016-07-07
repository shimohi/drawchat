declare namespace drawchat{
	interface Messages{
		message:Message[]
	}

	interface Message{
		id?:string;
		seq?:number;
		author?:string;
		time?:number;
		title?:string;
		canvas?:Canvas[];
	}
	interface Canvas{
		transform?:Transform;
		clip?:Clip;
		draws:Draw[];
	}
	interface Transform{
		a?:number;
		b?:number;
		c?:number;
		d?:number;
		x?:number;
		y?:number;
	}
	interface Clip{
		transform?:Transform;
		path:PathItem[];
	}
	interface PathItem{
		type:number;
	}
	interface MoveTo extends PathItem{
		x:number;
		y:number;
	}
	interface ArcTo extends PathItem{
		x1:number;
		y1:number;
		x2:number;
		y2:number;
		radius:number;
	}
	interface LineTo extends PathItem{
		x:number;
		y:number;
	}
	interface QuadraticCurveTo extends PathItem{
		cpx:number;
		cpy:number;
		x:number;
		y:number;
	}
	interface BezierCurveTo extends PathItem{
		cpx1:number;
		cpy1:number;
		cpx2:number;
		cpy3:number;
		x:number;
		y:number;
	}

	interface Draw{
		transform?:Transform;
		compositeOperation:number;
	}
	interface GraphicsDraw extends Draw{
		graphics:Graphic[];
	}
	interface Graphic {
		fill?:Fill;
		stroke?:Stroke;
		path:PathItem[]
	}
	interface Fill{

	}
	interface FillColor{
		color:string;
	}
	interface FillLinerGradient{
		x0:number;
		y0:number;
		x1:number;
		y1:number;
		colorStops?:ColorStop[];
	}
	interface ColorStop{
		offset:number;
		color:string;
	}
	interface RadialGradient{
		x0:number;
		y0:number;
		r0:number;
		x1:number;
		y1:number;
		r1:number;
		colorStops?:ColorStop[];
	}
	interface Stroke{
		fillStyle?:Fill;
		dash?:Dash;
		style?:StrokeStyle;
	}
	interface Dash{
		segments?:number[];
		offset?:number;
	}
	interface StrokeStyle{
		thickness?:number;
		caps?:number;
		joints?:number;
		miterLimit?:number;
		ignoreScale?:number;
	}
	interface TextDraw extends Draw{
		transform?:Transform;
		compositeOperation:number;
		text:Text;
	}
	interface Text{
		x:number;
		y:number;
		fill?:Fill;
		stroke?:Stroke;
		align?:string;
		baseline?:string;
		text:string;
	}
}
