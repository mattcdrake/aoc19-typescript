import { part1 as d1p1, part2 as d1p2 } from "../day1";
import { part1 as d2p1, part2 as d2p2 } from "../day2";
import { part1 as d3p1, part2 as d3p2 } from "../day3";
import { part1 as d4p1, part2 as d4p2 } from "../day4";
import { part1 as d5p1, part2 as d5p2 } from "../day5";
import { part1 as d6p1, part2 as d6p2 } from "../day6";
import { part1 as d7p1, part2 as d7p2 } from "../day7";
import { part1 as d8p1, part2 as d8p2 } from "../day8";
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

describe("Testing day 3, part 2", () => {
  it("should equal 14228", () => {
    const result = d3p2();
    expect(result).to.equal(14228);
  });
});

describe("Testing day 4, part 1", () => {
  it("should equal 1033", () => {
    const result = d4p1();
    expect(result).to.equal(1033);
  });
});

describe("Testing day 4, part 2", () => {
  it("should equal 670", () => {
    const result = d4p2();
    expect(result).to.equal(670);
  });
});

describe("Testing day 5, part 1", () => {
  it("should equal 13294380", () => {
    const result = d5p1();
    expect(result).to.equal(13294380);
  });
});

describe("Testing day 5, part 2", () => {
  it("should equal 11460760", () => {
    const result = d5p2();
    expect(result).to.equal(11460760);
  });
});

describe("Testing day 6, part 1", () => {
  it("should equal 158090", () => {
    const result = d6p1();
    expect(result).to.equal(158090);
  });
});

describe("Testing day 6, part 2", () => {
  it("should equal 241", () => {
    const result = d6p2();
    expect(result).to.equal(241);
  });
});

describe("Testing day 7, part 1", () => {
  it("should equal 70597", () => {
    const result = d7p1();
    expect(result).to.equal(70597);
  });
});

describe("Testing day 7, part 2", () => {
  it("should equal 30872528", () => {
    const result = d7p2();
    expect(result).to.equal(30872528);
  });
});

describe("Testing day 8, part 1", () => {
  it("should equal 2125", () => {
    const result = d8p1();
    expect(result).to.equal(2125);
  });
});
