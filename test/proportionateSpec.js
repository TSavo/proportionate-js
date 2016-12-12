var chai;
chai = require("chai");
chai.should();

var proportionate = require("../lib");

describe("Proportionate", function() {
    it("should throw an error when the first argument is not an array", function(){
        +function(){
            proportionate("Not an arrary", 1);
        }.should.throw();
    });

    it("should index directly on a one-to-one mapping", function() {
        proportionate([1, 2, 3], 1, 3).should.equal(1);
        proportionate([1, 2, 3], 2, 3).should.equal(2);
        proportionate([1, 2, 3], 3, 3).should.equal(3);
    });
    it("should index extremes when extremes are met", function() {
        proportionate([1, 2, 3], 0, 6).should.equal(1);
        proportionate([1, 2, 3], 1, 6).should.equal(1);
        proportionate([1, 2, 3], 2, 6).should.equal(1);
        proportionate([1, 2, 3], 3, 6).should.equal(2);
        proportionate([1, 2, 3], 4, 6).should.equal(2);
        proportionate([1, 2, 3], 5, 6).should.equal(3);
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
    it("should accept ranges that are greater than 0", function() {
        var weightRanks = ["fly", "light", "medium", "heavy", "super-heavy"];
        proportionate(weightRanks, 90, 80, 350).should.equal("fly");
        proportionate(weightRanks, 180, 80, 350).should.equal("light");
        proportionate(weightRanks, 240, 80, 350).should.equal("medium");
        proportionate(weightRanks, 290, 80, 350).should.equal("heavy");
        proportionate(weightRanks, 330, 80, 350).should.equal("super-heavy");
    });
});

