const fs = require("fs");

class IntcodeComputer {
  data: number[];
  pc: number;

  constructor(datapath: string) {
    const rawData = fs.readFileSync(datapath, "UTF-8");
    this.data = rawData.split(/,/).map((x: string) => Number(x));
    this.pc = 0;
  }

  getData(pos: number): number {
    if (pos > this.data.length - 1 || pos < 0) {
      return -1;
    }
    return this.data[pos];
  }

  setData(pos: number, val: number): void {
    this.data[pos] = val;
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

  // Returns true if the program is finished running
  stepFoward(): boolean {
    const opcode = this.data[this.pc];
    const pos1 = this.data[this.pc + 1];
    const pos2 = this.data[this.pc + 2];
    const pos3 = this.data[this.pc + 3];

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
    this.pc = this.pc + 4;

    return false;
  }

  run(): void {
    while (!this.stepFoward()) {}
  }
}

export { IntcodeComputer };
