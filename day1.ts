const fs = require("fs");

const data = fs.readFileSync("./input/day1.txt", "UTF-8");
const lines = data.split(/\n/);
lines.pop();
const nums = lines.map((x: string) => Number(x));

const getFuelReq: (mass: number) => number = function (mass) {
  return Math.floor(mass / 3) - 2;
};

// Finds fuel requirements recursively
const getFuelReqRec: (mass: number) => number = function (mass) {
  let temp = getFuelReq(mass);
  if (temp <= 0) {
    return 0;
  } else {
    return temp + getFuelReqRec(temp);
  }
};

const createReducer: (
  getFuelReq: (mass: number) => number
) => (accumulator: number, currentValue: number) => number = function (
  getFuelReq
) {
  return (accumulator, currentValue) => accumulator + getFuelReq(currentValue);
};

let part1: () => number = function () {
  return nums.reduce(createReducer(getFuelReq), 0);
};

let part2: () => number = function () {
  return nums.reduce(createReducer(getFuelReqRec), 0);
};

export { part1, part2 };
