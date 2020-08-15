import { haltMessage, IntcodeComputer } from "./intcode";

function permute(permutation: number[]): number[][] {
  let length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function part1(): number {
  let maxThrust = 0;
  let perms = permute([0, 1, 2, 3, 4]);
  for (let perm of perms) {
    let amps = new Array<IntcodeComputer>(5);
    for (let i = 0; i < amps.length; ++i) {
      amps[i] = new IntcodeComputer("./input/day7.txt");
    }
    let inputSignal = 0;
    for (let i = 0; i < amps.length; ++i) {
      amps[i].run();
      amps[i].giveInput(perm[i]);
      amps[i].run();
      amps[i].giveInput(inputSignal);
      amps[i].run();
      inputSignal = amps[i].getLastOutput();
    }
    if (inputSignal > maxThrust) {
      maxThrust = inputSignal;
    }
  }
  return maxThrust;
}

function part2(): number {
  let maxThrust = 0;
  let perms = permute([5, 6, 7, 8, 9]);
  for (let perm of perms) {
    let amps = new Array<IntcodeComputer>(5);
    for (let i = 0; i < amps.length; ++i) {
      amps[i] = new IntcodeComputer("./input/day7.txt");
    }

    let firstLoop = true;
    let outputSignal = 0;
    let thrusterSignal = 0;
    let currentAmp = 0;
    let haltMsg = haltMessage.NotDone;

    while (haltMsg !== haltMessage.Done) {
      amps[currentAmp].run();
      if (firstLoop) {
        amps[currentAmp].giveInput(perm[currentAmp]);
        if (currentAmp === 4) {
          firstLoop = false;
        }
        amps[currentAmp].run();
      }
      amps[currentAmp].giveInput(outputSignal);
      haltMsg = amps[currentAmp].run();
      outputSignal = amps[currentAmp].getLastOutput();
      if (currentAmp === 4) {
        thrusterSignal = outputSignal;
      }
      currentAmp = (currentAmp + 1) % 5;
    }
    if (thrusterSignal > maxThrust) {
      maxThrust = thrusterSignal;
    }
  }
  return maxThrust;
}

export { part1, part2 };
