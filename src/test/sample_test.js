"use strict";
const assert = require('power-assert');
const sample_1 = require('../ts/sample');
describe("sample test", () => {
    it("1+1=2であるべき。1", () => {
        let testTarget = new sample_1.default();
        assert(testTarget.sum(1, 1) == 2);
    });
});
//# sourceMappingURL=sample_test.js.map