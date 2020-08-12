import { haltMessage, IntcodeComputer } from "./intcode";

function part1(): number {
  const computer = new IntcodeComputer("./input/day5.txt");

  let haltMsg: haltMessage;
  do {
    haltMsg = computer.run();
    if (haltMsg === haltMessage.NeedInput) {
      computer.giveInput(1);
    }
    if (haltMsg === haltMessage.SendOuput) {
      //console.log(`intcode sent output: ${computer.getLastOutput()}`);
    }
  } while (haltMsg !== haltMessage.Done);
  return computer.getLastOutput();
}

function part2(): number {
  const computer = new IntcodeComputer("./input/day5.txt");

  let haltMsg: haltMessage;
  do {
    haltMsg = computer.run();
    if (haltMsg === haltMessage.NeedInput) {
      computer.giveInput(5);
    }
  } while (haltMsg !== haltMessage.Done);
  return computer.getLastOutput();
}

export { part1, part2 };
