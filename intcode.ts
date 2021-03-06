import * as fs from "fs";

enum instructionMode {
  Position = 0,
  Immediate = 1,
  Relative = 2,
}

enum haltMessage {
  Done = 0,
  NeedInput = 1,
  NotDone = 2,
  SendOuput = 3,
}

interface instructionComponents {
  opcode: number;
  pos1: number | null;
  pos2: number | null;
  pos3: number | null;
}

class IntcodeComputer {
  changedIP: boolean;
  data: number[];
  hasInput: boolean;
  input: number;
  ip: number;
  originalData: number[];
  output: number;
  relativeBase: number;

  constructor(datapath: string) {
    const rawData = fs.readFileSync(datapath, "utf-8");
    this.changedIP = false;
    this.originalData = rawData.split(/,/).map((x: string) => Number(x));
    this.copyOriginalDataToWorkingData();
    this.hasInput = false;
    this.input = 0;
    this.ip = 0;
    this.output = 0;
    this.relativeBase = 0;
  }

  advanceIP(opcode: number): void {
    switch (opcode) {
      case 1:
      case 2:
      case 7:
      case 8:
        this.ip += 4;
        break;
      case 3:
      case 4:
      case 9:
        this.ip += 2;
        break;
      case 5:
      case 6:
        if (this.changedIP) {
          this.changedIP = false;
        } else {
          this.ip += 3;
        }
        break;
    }
  }

  getData(pos: number): number {
    if (pos > this.data.length - 1 || pos < 0) {
      return -1;
    }
    return this.data[pos];
  }

  getProgramOutput(): number {
    return this.getData(0);
  }

  getLastOutput(): number {
    return this.output;
  }

  // This is different from the "setInput" function required by day 2.
  giveInput(input: number): void {
    this.input = input;
  }

  setData(pos: number, val: number): void {
    this.data[pos] = val;
  }

  setInput(noun: number, verb: number): void {
    this.setData(1, noun);
    this.setData(2, verb);
  }

  opcode1(pos1: number, pos2: number, pos3: number): void {
    this.data[pos3] = pos1 + pos2;
  }

  opcode2(pos1: number, pos2: number, pos3: number): void {
    this.data[pos3] = pos1 * pos2;
  }

  opcode3(pos1: number): void {
    this.data[pos1] = this.input;
  }

  opcode4(pos1: number): void {
    this.output = pos1;
  }

  opcode5(pos1: number, pos2: number): void {
    if (pos1 !== 0) {
      this.ip = pos2;
      this.changedIP = true;
    }
  }

  opcode6(pos1: number, pos2: number): void {
    if (pos1 === 0) {
      this.ip = pos2;
      this.changedIP = true;
    }
  }

  opcode7(pos1: number, pos2: number, pos3: number): void {
    this.data[pos3] = pos1 < pos2 ? 1 : 0;
  }

  opcode8(pos1: number, pos2: number, pos3: number): void {
    this.data[pos3] = pos1 === pos2 ? 1 : 0;
  }

  opcode9(pos1: number): void {
    this.relativeBase += pos1;
  }

  parseModes(
    input: number,
  ): [instructionMode, instructionMode, instructionMode] {
    let output: [instructionMode, instructionMode, instructionMode] = [
      instructionMode.Position,
      instructionMode.Position,
      instructionMode.Position,
    ];

    let parameter = 0;
    while (input > 0) {
      let mode = input % 10;
      switch (mode) {
        case 0:
          output[parameter] = instructionMode.Position;
          break;
        case 1:
          output[parameter] = instructionMode.Immediate;
          break;
        case 2:
          output[parameter] = instructionMode.Relative;
          break;
      }
      parameter++;
      input = Math.floor(input / 10);
    }
    return output;
  }

  parseOpcode(opcode: number): instructionComponents {
    let output: instructionComponents = {
      opcode: opcode % 100,
      pos1: null,
      pos2: null,
      pos3: null,
    };

    let modes = this.parseModes(Math.floor(opcode / 100));
    switch (output.opcode) {
      case 1:
      case 2:
      case 7:
      case 8:
        output.pos1 = this.parseParameter(
          this.data[this.ip + 1],
          modes[0],
          false,
        );
        output.pos2 = this.parseParameter(
          this.data[this.ip + 2],
          modes[1],
          false,
        );
        output.pos3 = this.parseParameter(
          this.data[this.ip + 3],
          modes[2],
          true,
        );
        break;
      case 3:
        output.pos1 = this.parseParameter(
          this.data[this.ip + 1],
          modes[0],
          true,
        );
        break;
      case 4:
      case 9:
        output.pos1 = this.parseParameter(
          this.data[this.ip + 1],
          modes[0],
          false,
        );
        break;
      case 5:
      case 6:
        output.pos1 = this.parseParameter(
          this.data[this.ip + 1],
          modes[0],
          false,
        );
        output.pos2 = this.parseParameter(
          this.data[this.ip + 2],
          modes[1],
          false,
        );
        break;
    }
    return output;
  }

  // Positions that are written to have different behavior in position/relative mode.
  parseParameter(
    value: number,
    mode: instructionMode,
    writePosition: boolean,
  ): number {
    if (mode === instructionMode.Immediate) {
      return value;
    } else if (mode === instructionMode.Position && writePosition) {
      return value;
    } else if (mode === instructionMode.Position) {
      return this.data[value];
    } else if (mode === instructionMode.Relative && writePosition) {
      return value + this.relativeBase;
    } else if (mode === instructionMode.Relative) {
      return this.data[value + this.relativeBase];
    }
  }

  copyOriginalDataToWorkingData(): void {
    this.data = [...this.originalData];
  }

  resetComputer(): void {
    this.copyOriginalDataToWorkingData();
    this.ip = 0;
  }

  // Returns true if the program is finished running
  stepFoward(): haltMessage {
    const { opcode, pos1, pos2, pos3 } = this.parseOpcode(this.data[this.ip]);
    let haltMsg: haltMessage = haltMessage.NotDone;

    switch (opcode) {
      case 1:
        this.opcode1(pos1, pos2, pos3);
        break;
      case 2:
        this.opcode2(pos1, pos2, pos3);
        break;
      case 3:
        if (this.hasInput) {
          this.hasInput = false;
          this.opcode3(pos1);
        } else {
          this.hasInput = true;
          return haltMessage.NeedInput;
        }
        break;
      case 4:
        this.opcode4(pos1);
        haltMsg = haltMessage.SendOuput;
        break;
      case 5:
        this.opcode5(pos1, pos2);
        break;
      case 6:
        this.opcode6(pos1, pos2);
        break;
      case 7:
        this.opcode7(pos1, pos2, pos3);
        break;
      case 8:
        this.opcode8(pos1, pos2, pos3);
        break;
      case 9:
        this.opcode9(pos1);
        break;
      case 99:
        return haltMessage.Done;
    }
    this.advanceIP(opcode);

    return haltMsg;
  }

  run(): haltMessage {
    while (true) {
      const haltMsg: haltMessage = this.stepFoward();
      if (
        haltMsg === haltMessage.Done ||
        haltMsg === haltMessage.NeedInput ||
        haltMsg === haltMessage.SendOuput
      ) {
        return haltMsg;
      }
    }
  }
}

export { haltMessage, IntcodeComputer };
