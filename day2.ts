import { IntcodeComputer } from "./intcode";

const part1 = function (): number {
  const computer = new IntcodeComputer("./input/day2.txt");
  computer.setData(1, 12);
  computer.setData(2, 2);
  computer.run();
  return computer.getData(0);
};

export { part1 };
