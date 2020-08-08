import { IntcodeComputer } from "./intcode";

const part1 = function (): number {
  const computer = new IntcodeComputer("./input/day2.txt");
  computer.setInput(12, 2);
  computer.run();
  return computer.getProgramOutput();
};

const part2 = function (): number {
  const computer = new IntcodeComputer("./input/day2.txt");
  for (let i = 0; i < 100; ++i) {
    for (let j = 0; j < 100; ++j) {
      computer.resetComputer();
      computer.setInput(i, j);
      computer.run();
      if (computer.getProgramOutput() === 19690720) {
        return 100 * i + j;
      }
    }
  }
  return -1;
};

export { part1, part2 };
