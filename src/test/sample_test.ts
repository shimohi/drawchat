import * as assert from 'power-assert';
import TestTarget from '../ts/sample';

describe("sample test", ()=>{
	it("1+1=2であるべき。1", ()=>{
		let testTarget = new TestTarget();
		assert(testTarget.sum(1,1) == 2);
	});
});
