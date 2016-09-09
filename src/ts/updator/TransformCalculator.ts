import Transform = drawchat.Transform;

const ROUND_DIGITS = 5;
const ROUND_NUMBER = Math.pow(10,ROUND_DIGITS);

export class TransformCalculator {

	/**
	 * このマトリックスの逆変換を実行します。
	 */
	static invert(transform:Transform):Transform{

		if(transform == null){
			return null;
		}
		if(isDefault(transform)){
			return transform;
		}

		var a1 = transform.a;
		var b1 = transform.b;
		var c1 = transform.c;
		var d1 = transform.d;
		var tx1 = transform.x;
		var ty1 = transform.y;

		//このマトリックスとの行列積が初期値
		//|1 0 0
		//|0 1 0
		//|0 0 1
		//となるような値を求める
		let result:Transform = {};
		result.a = round(-a1 / (b1 * c1 - a1 * d1));
		result.b = round(b1 / (b1 * c1 - a1 * d1));
		result.c = round(-c1 / (a1 * d1 - b1 * c1));
		result.d = round(a1 / (a1 * d1 - b1 * c1));

		//	this.tx = round((a1 * ty1 - tx1) / (a1 * d1 - b1 * c1));
		//	this.ty = round(-(c1 * (a1 * ty1 - tx1))/(a1 * (a1 * d1 - b1 * c1)) - tx1 / a1);
		result.x = round(-tx1);
		result.y = round(-ty1);
		return result;
	}

	/**
	 * 変換マトリックスに並行移動を加えます。
	 * @param transform
	 * @param tx
	 * @param ty
	 * @returns {Transform}
	 */
	static translate(transform:Transform,tx:number,ty:number):Transform {
		let translateMatrix:Transform = {
			a:1,
			b:0,
			c:0,
			d:1,
			x:tx,
			y:ty
		};
		return TransformCalculator.concatMatrix(transform,translateMatrix);
	}

	/**
	 * 変換マトリックスにX軸方向への変倍を加えます。
	 * @param transform
	 * @param scaleX
	 * @returns {Transform}
	 */
	static scaleX(transform:Transform,scaleX:number):Transform {
		return TransformCalculator.scale(transform,scaleX, 1);
	}

	/**
	 * 変換マトリックスにY軸方向への変倍を加えます。
	 * @param transform
	 * @param scaleY
	 * @returns {Transform}
	 */
	static scaleY(transform:Transform,scaleY:number):Transform{
		return TransformCalculator.scale(transform,1,scaleY);
	}

	/**
	 * 変換マトリックスに変倍を加えます。
	 * @param transform
	 * @param scaleX
	 * @param scaleY
	 * @returns {Transform}
	 */
	static scale(transform:Transform,scaleX:number,scaleY:number):Transform{
		// var scaleMatrix = new Matrix(scaleX,0,0,scaleY,0,0);
		let scaleMatrix:Transform = {
			a:scaleX,
			b:0,
			c:0,
			d:scaleY,
			x:0,
			y:0
		};

		return TransformCalculator.concatMatrix(transform,scaleMatrix);
	}

	/**
	 * 変換マトリックスに回転成分を加えます。
	 * @param transform
	 * @param rad
	 * @returns {Transform}
	 */
	static rotate(transform:Transform,rad:number):Transform {
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);

		let rotateMatrix:Transform = {
			a:cos,
			b:sin,
			c:-sin,
			d:cos,
			x:0,
			y:0
		};
		// var rotateMatrix = new Matrix(cos, sin, -sin, cos, 0, 0);
		return TransformCalculator.concatMatrix(transform,rotateMatrix);
	}

	/**
	 * マトリックスにX軸方向へのゆがみ成分を加えます。
	 * @param transform
	 * @param radX
	 * @returns {Transform}
	 */
	static skewX(transform:Transform,radX:number):Transform{
		return TransformCalculator.skew(transform,radX,0);
	}

	/**
	 * マトリックスにY軸方向へのゆがみ成分を加えます。
	 * @param transform
	 * @param radY
	 * @returns {Transform}
	 */
	static skewY(transform:Transform,radY:number):Transform{
		return TransformCalculator.skew(transform,0,radY);
	}

	/**
	 * マトリックスにゆがみ成分を加えます。
	 * @param transform
	 * @param radX
	 * @param radY
	 * @returns {Transform}
	 */
	static skew(transform:Transform,radX:number,radY:number):Transform{
		let tanX = checkAndConvertNumber(Math.tan(round(radX)),Number.MAX_VALUE);
		let tanY = checkAndConvertNumber(Math.tan(round(radY)),Number.MAX_VALUE);
		let skewMatrix:Transform = {
			a:1,
			b:tanY,
			c:tanX,
			d:1,
			x:0,
			y:0
		};
		// var skewMatrix = new Matrix(1,tanY,tanX,1,0,0);
		return TransformCalculator.concatMatrix(transform,skewMatrix);
	}

	/**
	 * Matrixを結合します。
	 * @param transform1
	 * @param transform2
	 * @returns {Transform}
	 */
	static concatMatrix(transform1:Transform,transform2:Transform):Transform{
		if(transform1 == null || isDefault(transform1)){
			return transform2;
		}
		if(isDefault(transform2)){
			return transform1;
		}
		var a1 = transform1.a;
		var b1 = transform1.b;
		var c1 = transform1.c;
		var d1 = transform1.d;
		var tx1 = transform1.x;
		var ty1 = transform1.y;

		//行列の積を求める
		// | a c tx |
		// | b d ty |
		// | 0 0 1  |
		let result:Transform = {};
		result.a = round(a1 * transform2.a + c1 * transform2.b);// + tx1 * 0;
		result.b = round(b1 * transform2.a + d1 * transform2.b);// + ty1 * 0;
		result.c = round(a1 * transform2.c + c1 * transform2.d);// + tx1 * 0;
		result.d = round(b1 * transform2.c + d1 * transform2.d);// + ty1 * 0;
		result.x = round(transform2.x  + tx1);
		result.y = round(transform2.y + ty1);

		console.log(`transform1:${JSON.stringify(transform1)} transform2:${JSON.stringify(transform2)} result:${JSON.stringify(result)}`);

		return result;
	}

	/**
	 * マトリックスに合わせて、座標変換を行います。
	 * @param transform
	 * @param point
	 * @returns {Point}
	 */
	static transformPoint(transform:Transform,point:Point):Point{
		return TransformCalculator.transform(transform,point.x,point.y);
	}

	/**
	 * マトリックスに合わせて、座標変換を行います。
	 * @param transform
	 * @param x
	 * @param y
	 * @returns {Point}
	 */
	static transform(transform:Transform,x:number,y:number):Point{
		var x = transform.a * x + transform.c * y + transform.x;
		var y = transform.b * x + transform.d * y + transform.y;
		return new Point(x,y);
	}
}
export class Point{
	constructor(x:number,y:number){
		this.x = x;
		this.y = y;
	}
	x:number;
	y:number;
}

function round(number:number){
	var number1 = number * ROUND_NUMBER;
	number1 = Math.round(number1);
	return number1/ROUND_NUMBER;
}

function isDefault(transform:Transform){
	return (
			transform.a === 1
		&&	transform.b === 0
		&&	transform.c === 0
		&&	transform.d === 1
		&&	transform.x === 0
		&&	transform.y === 0
	);
}

/**
 * 指定された値を数値化して返します。
 * @param number
 * @param substitute
 * @returns {*}
 */
function checkAndConvertNumber(number:any,substitute:number):number{
	if(number == null || number.length==0 || !isFinite(number)){
		return substitute;
	}
	return Number(number);
}