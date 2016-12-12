var chai;
chai = require("chai");
chai.should();

describe("Clamped Proportionate Arrays", function() {
    it("should exclusively index extremes when extremes are met", function() {
        require("../lib/clamped").arrays();
        [1, 2, 3].proportionate(0, 6).should.equal(1);
        [1, 2, 3].proportionate(1, 6).should.equal(2);
        [1, 2, 3].proportionate(2, 6).should.equal(2);
        [1, 2, 3].proportionate(3, 6).should.equal(2);
        [1, 2, 3].proportionate(4, 6).should.equal(2);
        [1, 2, 3].proportionate(5, 6).should.equal(2);
        [1, 2, 3].proportionate(6, 6).should.equal(3);
    });
    it("should skip items when the max is small", function() {
        require("../lib/clamped/arrays");
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].proportionate(0, 3).should.equal(1);
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].proportionate(1, 3).should.equal(3);
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].proportionate(2, 3).should.equal(7);
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].proportionate(3, 3).should.equal(10);
    });
    it("should clamp to the extremes when out of bounds", function() {
        require("../lib/clamped").arrays();
        [1, 2, 3].proportionate(-1, 3).should.equal(1);
        [1, 2, 3].proportionate(4, 3).should.equal(3);
    });
    it("should repeat the n+1 and n-1 extremes when close to the extremes", function() {
        require("../lib/clamped").arrays();
        var tankFullness = ["empty", "almost empty", "half-full", "mostly full", "completely full"];
        tankFullness.proportionate(0, 0, 10).should.equal("empty");
        tankFullness.proportionate(1, 0, 10).should.equal("almost empty");
        tankFullness.proportionate(2, 0, 10).should.equal("almost empty");
        tankFullness.proportionate(3, 0, 10).should.equal("almost empty");
        tankFullness.proportionate(4, 0, 10).should.equal("almost empty");
        tankFullness.proportionate(5, 0, 10).should.equal("half-full");
        tankFullness.proportionate(6, 0, 10).should.equal("half-full");
        tankFullness.proportionate(7, 0, 10).should.equal("mostly full");
        tankFullness.proportionate(8, 0, 10).should.equal("mostly full");
        tankFullness.proportionate(9, 0, 10).should.equal("mostly full");
        tankFullness.proportionate(10, 0, 10).should.equal("completely full");
    });
});

