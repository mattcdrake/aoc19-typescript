import * as fs from "fs";

let wirePathsRaw = fs.readFileSync("./input/day3.txt", "utf-8");
let wirePaths = wirePathsRaw.split(/\n/);
wirePaths.pop();
const firstCoordinates = getWireCoordinates(wirePaths[0]);
const secondCoordinates = getWireCoordinates(wirePaths[1]);
let mutualPoints: point[] = findMatchingPoints(
  firstCoordinates,
  secondCoordinates
);

interface wirePath {
  [x: number]: {
    [y: number]: number;
  };
}

interface point {
  x: number;
  y: number;
}

function getWireCoordinates(path: string): wirePath {
  let coords: wirePath = {};
  let steps = path.split(",");
  let stepCt = 0;
  let currentX = 0;
  let currentY = 0;
  let xDir = 0;
  let yDir = 0;
  for (let step of steps) {
    let direction = step[0];
    let magnitude = Number(step.slice(1));
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
      stepCt++;
      currentX += xDir;
      currentY += yDir;
      if (!coords[currentX]) {
        coords[currentX] = {};
      }
      if (!coords[currentX][currentY]) {
        coords[currentX][currentY] = stepCt;
      }
    }
  }
  return coords;
}

function findMatchingPoints(
  firstPath: wirePath,
  secondPath: wirePath
): point[] {
  let matchingPoints: point[] = [];
  Object.keys(firstPath).forEach((xValue) => {
    let xNum = Number(xValue);
    if (!secondPath[xNum]) {
      return;
    }
    Object.keys(firstPath[xNum]).forEach((yValue) => {
      let yNum = Number(yValue);
      if (secondPath[xNum][yNum]) {
        matchingPoints.push({ x: xNum, y: yNum });
      }
    });
  });
  return matchingPoints;
}

function findMinDistance(mutualPoints: point[]): number {
  let minDistance = Infinity;
  for (let point of mutualPoints) {
    const distance = Math.abs(point.x) + Math.abs(point.y);
    if (distance < minDistance) {
      minDistance = distance;
    }
  }
  return minDistance;
}

function findMinSteps(
  mutualPoints: point[],
  firstSteps: wirePath,
  secondSteps: wirePath
): number {
  let minSteps = Infinity;
  for (let point of mutualPoints) {
    let firstStepCt = firstSteps[point.x][point.y];
    let secondStepCt = secondSteps[point.x][point.y];
    let tempSteps = firstStepCt + secondStepCt;
    if (tempSteps < minSteps) {
      minSteps = tempSteps;
    }
  }
  return minSteps;
}

function part1(): number {
  return findMinDistance(mutualPoints);
}

const part2 = function (): number {
  return findMinSteps(mutualPoints, firstCoordinates, secondCoordinates);
};

export { part1, part2 };
