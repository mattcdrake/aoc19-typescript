const fs = require("fs");

const getFuelReq: (mass: number) => number = function (mass) {
  return Math.floor(mass / 3) - 2;
};

const createReducer: (
  getFuelReq: (mass: number) => number
) => (accumulator: number, currentValue: number) => number = function (
  getFuelReq
) {
  return (accumulator, currentValue) => accumulator + getFuelReq(currentValue);
};

let part1: () => number = function () {
  const data = fs.readFileSync("./input/day1.txt", "UTF-8");
  const lines = data.split(/\n/);
  lines.pop();
  const nums = lines.map((x: string) => Number(x));
  return nums.reduce(createReducer(getFuelReq), 0);
};

export { part1 };
