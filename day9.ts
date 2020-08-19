import { haltMessage, IntcodeComputer } from "./intcode";

function part1(): number {
  let computer: IntcodeComputer = new IntcodeComputer("./input/day9.txt");
  let haltMsg: haltMessage = null;
  while (haltMsg !== haltMessage.Done) {
    haltMsg = computer.run();
    if (haltMsg === haltMessage.NeedInput) {
      computer.giveInput(1);
    }
    /*
    if (haltMsg === haltMessage.SendOuput) {
      console.log(computer.getLastOutput());
    }
    */
  }
  return computer.getLastOutput();
}

function part2(): number {
  return -1;
}

export { part1, part2 };
