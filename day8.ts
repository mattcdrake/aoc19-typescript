import * as fs from "fs";

class Layer {
  pixels: number[][];
  width: number;
  height: number;

  constructor(width: number, height: number, data: string) {
    this.width = width;
    this.height = height;
    this.pixels = [];
    for (let i = 0; i < height; ++i) {
      this.pixels.push([]);
      for (let j = 0; j < width; ++j) {
        this.pixels[i].push(Number(data[i * width + j]));
      }
    }
  }

  countNumInLayer(num: number): number {
    let count = 0;
    for (let i = 0; i < this.pixels.length; ++i) {
      for (let j = 0; j < this.pixels[i].length; ++j) {
        if (this.pixels[i][j] === num) {
          count++;
        }
      }
    }
    return count;
  }
}

class Image {
  layers: Layer[];
  width: number;
  height: number;

  constructor(width: number, height: number, data: string) {
    this.width = width;
    this.height = height;

    let layerSize = width * height;
    let layerCt = data.length / layerSize;
    this.layers = [];
    for (let i = 0; i < layerCt; ++i) {
      let layerSlice = data.slice(i * layerSize, (i + 1) * layerSize);
      this.layers.push(new Layer(width, height, layerSlice));
    }
  }

  layerWithMinNum(num: number): Layer {
    let minNum = Infinity;
    let minNumIndex = -1;
    this.layers.forEach((value, index) => {
      let numsInLayer = value.countNumInLayer(0);
      if (numsInLayer < minNum) {
        minNum = numsInLayer;
        minNumIndex = index;
      }
    });
    return this.layers[minNumIndex];
  }
}

function part1(): number {
  let pixelInput = fs.readFileSync("./input/day8.txt", "utf8");
  let image = new Image(25, 6, pixelInput);
  let layer = image.layerWithMinNum(0);
  return layer.countNumInLayer(1) * layer.countNumInLayer(2);
}

function part2(): number {
  return -1;
}

export { part1, part2 };
