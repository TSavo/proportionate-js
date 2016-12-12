var chai, expect;
chai = require("chai");
chai.should();

describe("Clamped Proportionate", function() {
    var proportionate = require("../lib/clamped");

    it("should throw an error when the first argument is not an array", function(){
        +function(){
            proportionate("Not an arrary", 1);
        }.should.throw();
    });
    it("should exclusively index extremes when extremes are met", function() {
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
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 3).should.equal(3);
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 3).should.equal(7);
        proportionate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 3).should.equal(10);
    });
    it("should clamp to the extremes when out of bounds", function() {
        proportionate([1, 2, 3], -1, 3).should.equal(1);
        proportionate([1, 2, 3], 4, 3).should.equal(3);
    });
    it("should repeat the n+1 and n-1 extremes when close to the extremes", function() {
        var tankFullness = ["empty", "almost empty", "half-full", "mostly full", "completely full"];
        proportionate(tankFullness, 0, 1, 10).should.equal("empty");
        proportionate(tankFullness, 1, 1, 10).should.equal("empty");
        proportionate(tankFullness, 2, 1, 10).should.equal("almost empty");
        proportionate(tankFullness, 3, 1, 10).should.equal("almost empty");
        proportionate(tankFullness, 4, 1, 10).should.equal("almost empty");
        proportionate(tankFullness, 5, 1, 10).should.equal("almost empty");
        proportionate(tankFullness, 6, 1, 10).should.equal("half-full");
        proportionate(tankFullness, 7, 1, 10).should.equal("half-full");
        proportionate(tankFullness, 8, 1, 10).should.equal("mostly full");
        proportionate(tankFullness, 9, 1, 10).should.equal("mostly full");
        proportionate(tankFullness, 10, 1, 10).should.equal("completely full");
    });
});

