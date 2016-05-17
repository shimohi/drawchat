"use strict";
var assert = require('power-assert');
var sample_1 = require('../ts/sample');
describe("sample test", function () {
    it("1+1=2であるべき。1", function () {
        var testTarget = new sample_1.default();
        assert(testTarget.sum(1, 1) == 2);
    });
});
//# sourceMappingURL=sample_test.js.map