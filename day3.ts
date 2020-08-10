import * as fs from "fs";

let wirePathsRaw = fs.readFileSync("./input/day3.txt", "utf-8");
let wirePaths = wirePathsRaw.split(/\n/);
wirePaths.pop();

interface wirePath {
  [point: string]: boolean;
}

function getWireCoordinates(path: string): wirePath {
  let coords: wirePath = {};
  let steps = path.split(",");
  let currentX = 0;
  let currentY = 0;
  let xDir = 0;
  let yDir = 0;

  steps.forEach((item) => {
    let direction = item[0];
    let magnitude = Number(item.slice(1));
    switch (direction) {
      case "U":
        xDir = 0;
        yDir = 1;
        break;
      case "R":
        xDir = 1;
        yDir = 0;
        break;
      case "D":
        xDir = 0;
        yDir = -1;
        break;
      case "L":
        xDir = -1;
        yDir = 0;
        break;
    }
    for (let i = 0; i < magnitude; ++i) {
      currentX += xDir;
      currentY += yDir;
      coords[currentX + "," + currentY] = true;
    }
  });
  return coords;
}

function findMinDistance(mutualPoints: string[]): number {
  let minDistance = Infinity;
  mutualPoints.forEach((item) => {
    const dims = item.split(",");
    const distance = Math.abs(Number(dims[0])) + Math.abs(Number(dims[1]));
    if (distance < minDistance) {
      minDistance = distance;
    }
  });
  return minDistance;
}

function part1(): number {
  const firstCoordinates = getWireCoordinates(wirePaths[0]);
  const secondCoordinates = getWireCoordinates(wirePaths[1]);
  const mutualPoints = Object.keys(firstCoordinates).filter(
    (item) => secondCoordinates[item]
  );
  return findMinDistance(mutualPoints);
}

const part2 = function (): number {
  return -1;
};

export { part1, part2 };
