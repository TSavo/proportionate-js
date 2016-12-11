var chai, expect;

chai = require("chai");

expect = chai.expect;

chai.should();

proportionate = require("../index");

describe("Proportionate arrays", function() {
    it("should index directly on a one-to-one mapping", function() {
        proportionate([1, 2, 3], 0, 3).should.equal(1);
        proportionate([1, 2, 3], 1, 3).should.equal(2);
        proportionate([1, 2, 3], 2, 3).should.equal(2);
        proportionate([1, 2, 3], 3, 3).should.equal(3);
    });
    it("should only index extremes when extremes are met", function() {
        proportionate([1, 2, 3], 0, 6).should.equal(1);
        proportionate([1, 2, 3], 1, 6).should.equal(2);
        proportionate([1, 2, 3], 2, 6).should.equal(2);
        proportionate([1, 2, 3], 3, 6).should.equal(2);
        proportionate([1, 2, 3], 4, 6).should.equal(2);
        proportionate([1, 2, 3], 5, 6).should.equal(2);
        proportionate([1, 2, 3], 6, 6).should.equal(3);
    });
    it("should skip items when the max is small", function() {
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, 3).should.equal(1);
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 3).should.equal(4);
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 3).should.equal(7);
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 3).should.equal(10);
    });
    return it("should clamp to the extremes when out of bounds", function() {
        proportionate([1, 2, 3], -1, 3).should.equal(1);
        proportionate([1, 2, 3], 4, 3).should.equal(3);
    });
});

