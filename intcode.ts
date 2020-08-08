const fs = require("fs");

class IntcodeComputer {
  originalData: number[];
  data: number[];
  ip: number;

  constructor(datapath: string) {
    const rawData = fs.readFileSync(datapath, "UTF-8");
    this.originalData = rawData.split(/,/).map((x: string) => Number(x));
    this.copyOriginalDataToWorkingData();
    this.ip = 0;
  }

  advanceIP(): void {
    switch (this.data[this.ip]) {
      case 1:
      case 2:
        this.ip += 4;
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

  setData(pos: number, val: number): void {
    this.data[pos] = val;
  }

  setInput(noun: number, verb: number): void {
    this.setData(1, noun);
    this.setData(2, verb);
  }

  opcode1(pos1: number, pos2: number, pos3: number): void {
    const arg1 = this.data[pos1];
    const arg2 = this.data[pos2];
    this.data[pos3] = arg1 + arg2;
  }

  opcode2(pos1: number, pos2: number, pos3: number): void {
    const arg1 = this.data[pos1];
    const arg2 = this.data[pos2];
    this.data[pos3] = arg1 * arg2;
  }

  copyOriginalDataToWorkingData(): void {
    this.data = [...this.originalData];
  }

  resetComputer(): void {
    this.copyOriginalDataToWorkingData();
    this.ip = 0;
  }

  // Returns true if the program is finished running
  stepFoward(): boolean {
    const opcode = this.data[this.ip];
    const pos1 = this.data[this.ip + 1];
    const pos2 = this.data[this.ip + 2];
    const pos3 = this.data[this.ip + 3];

    switch (opcode) {
      case 1:
        this.opcode1(pos1, pos2, pos3);
        break;
      case 2:
        this.opcode2(pos1, pos2, pos3);
        break;
      case 99:
        return true;
    }
    this.advanceIP();

    return false;
  }

  run(): void {
    while (!this.stepFoward()) {}
  }
}

export { IntcodeComputer };
