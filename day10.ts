import * as fs from "fs";

enum Node {
  Empty = 0,
  Asteroid = 1,
}

interface Point {
  x: number;
  y: number;
}

interface SolarSystem {
  nodes: Node[][];
}

function reduce(numerator: number, denominator: number): number[] {
  let gcd = function gcd(a: number, b: number): number {
    return b ? gcd(b, a % b) : a;
  };
  let gcdval = gcd(numerator, denominator);
  return [numerator / gcdval, denominator / gcdval];
}

function buildSolarSystem(path: string): SolarSystem {
  let rawInput = fs.readFileSync(path, "utf8");
  let lines = rawInput.split("\n");
  let system: SolarSystem = { nodes: [] };
  let y = 0;
  for (let line of lines) {
    system.nodes.push([]);
    for (let char of line) {
      if (char === "#") {
        system.nodes[y].push(Node.Asteroid);
      } else {
        system.nodes[y].push(Node.Empty);
      }
    }
    y++;
  }
  return system;
}

function areNodesInLOS(
  system: SolarSystem,
  destination: Point,
  start: Point,
): boolean {
  // Find slope between the two points
  let rise = start.y - destination.y;
  let run = start.x - destination.x;

  // Reduce slope to simplest terms
  let slope = reduce(rise, run);

  // Slope is irreducible - points must be in LOS
  if (slope[1] === NaN) {
    return true;
  }

  // Get the signs right
  slope[0] = Math.abs(slope[0]);
  slope[1] = Math.abs(slope[1]);
  run = start.x > destination.x ? -slope[1] : slope[1];
  rise = start.y > destination.y ? -slope[0] : slope[0];

  // Step along line from start to destination, checking each node
  let curX = start.x + run;
  let curY = start.y + rise;

  while (curX !== destination.x || curY !== destination.y) {
    if (system.nodes[curY][curX] !== Node.Empty) {
      return false;
    }
    curY += rise;
    curX += run;
  }
  return true;
}

function findAsteroidsInLOS(system: SolarSystem, point: Point): number {
  let asteroids = 0;
  for (let y = 0; y < system.nodes.length; ++y) {
    for (let x = 0; x < system.nodes[y].length; ++x) {
      if (
        (x === point.x && y === point.y) ||
        system.nodes[y][x] !== Node.Asteroid
      ) {
        continue;
      }
      if (areNodesInLOS(system, { x: point.x, y: point.y }, { x, y })) {
        asteroids++;
      }
    }
  }
  return asteroids;
}

function findMaxAsteroidsInLOS(system: SolarSystem): number {
  let max = 0;
  //let maxPoint: Point;
  for (let y = 0; y < system.nodes.length; ++y) {
    for (let x = 0; x < system.nodes[y].length; ++x) {
      if (system.nodes[y][x] !== Node.Asteroid) {
        continue;
      }
      let asteroids = findAsteroidsInLOS(system, { x, y });
      if (asteroids > max) {
        max = asteroids;
        //maxPoint = { x, y };
      }
    }
  }
  return max;
}

function part1(): number {
  let system = buildSolarSystem("./input/day10.txt");
  return findMaxAsteroidsInLOS(system);
}

function part2(): number {
  return -1;
}

export { part1, part2 };
