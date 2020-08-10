import { part1 as d1p1, part2 as d1p2 } from "../day1";
import { part1 as d2p1, part2 as d2p2 } from "../day2";
import { part1 as d3p1, part2 as d3p2 } from "../day3";
import { expect } from "chai";
import "mocha";

describe("Testing day 1, part 1", () => {
  it("should equal 3514064", () => {
    const result = d1p1();
    expect(result).to.equal(3514064);
  });
});

describe("Testing day 1, part 2", () => {
  it("should equal 5268207", () => {
    const result = d1p2();
    expect(result).to.equal(5268207);
  });
});

describe("Testing day 2, part 1", () => {
  it("should equal 3760627", () => {
    const result = d2p1();
    expect(result).to.equal(3760627);
  });
});

describe("Testing day 2, part 2", () => {
  it("should equal 7195", () => {
    const result = d2p2();
    expect(result).to.equal(7195);
  });
});

describe("Testing day 3, part 1", () => {
  it("should equal 1285", () => {
    const result = d3p1();
    expect(result).to.equal(1285);
  });
});
