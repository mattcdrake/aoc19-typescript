import * as fs from "fs";

enum PixelColor {
  Black,
  White,
  Transparent,
}

class Layer {
  pixels: PixelColor[][];
  width: number;
  height: number;

  constructor(width: number, height: number, data: string) {
    this.width = width;
    this.height = height;
    this.pixels = [];
    for (let i = 0; i < height; ++i) {
      this.pixels.push([]);
      for (let j = 0; j < width; ++j) {
        let pixel: PixelColor = Number(data[i * width + j]);
        this.pixels[i].push(pixel);
      }
    }
  }

  countColorInLayer(color: PixelColor): number {
    let count = 0;
    for (let i = 0; i < this.pixels.length; ++i) {
      for (let j = 0; j < this.pixels[i].length; ++j) {
        if (this.pixels[i][j] === color) {
          count++;
        }
      }
    }
    return count;
  }

  getPixel(x: number, y: number): PixelColor {
    return this.pixels[y][x];
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

  layerWithMinColor(color: PixelColor): Layer {
    let minNum = Infinity;
    let minNumIndex = -1;
    this.layers.forEach((value, index) => {
      let numsInLayer = value.countColorInLayer(color);
      if (numsInLayer < minNum) {
        minNum = numsInLayer;
        minNumIndex = index;
      }
    });
    return this.layers[minNumIndex];
  }

  getPixel(x: number, y: number): PixelColor {
    let pixel;
    for (let layer of this.layers) {
      pixel = layer.getPixel(x, y);
      if (pixel !== PixelColor.Transparent) {
        return pixel;
      }
    }
    return pixel;
  }
}

let pixelInput = fs.readFileSync("./input/day8.txt", "utf8");
let image = new Image(25, 6, pixelInput);

function part1(): number {
  let layer = image.layerWithMinColor(PixelColor.Black);
  return (
    layer.countColorInLayer(PixelColor.White) *
    layer.countColorInLayer(PixelColor.Transparent)
  );
}

function part2(): string {
  let output: string = "";
  for (let i = 0; i < image.height; ++i) {
    for (let j = 0; j < image.width; ++j) {
      let pixel = image.getPixel(j, i);
      let char;
      switch (pixel) {
        case PixelColor.Black:
          char = "X";
          break;
        default:
          char = " ";
          break;
      }
      output += char;
    }
    output += "\n";
  }
  return output;
}

export { part1, part2 };
