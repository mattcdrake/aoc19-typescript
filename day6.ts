import * as fs from "fs";

interface BodyNode {
  name: string;
  orbiters: BodyNode[];
}

interface OrbitPair {
  orbitee: string;
  orbiter: string;
}

function readPairs(path: string): OrbitPair[] {
  let rawPairsStr = fs.readFileSync(path, "utf-8");
  let rawPairs = rawPairsStr.split(/\n/);
  let orbitPairs: OrbitPair[] = [];

  for (let pair of rawPairs) {
    let bodies = pair.split(")");
    orbitPairs.push({ orbitee: bodies[0], orbiter: bodies[1] });
  }

  return orbitPairs;
}

// This also deletes the pair from `pairs`.
function addOrbitersToNode(orbitee: BodyNode, pairs: OrbitPair[]): void {
  for (let i = 0; i < pairs.length; ++i) {
    if (pairs[i].orbitee === orbitee.name) {
      orbitee.orbiters.push({ name: pairs[i].orbiter, orbiters: [] });
      pairs.splice(i, 1);
      i--;
    }
  }
}

function buildLinksRec(orbitee: BodyNode, pairs: OrbitPair[]): void {
  addOrbitersToNode(orbitee, pairs);
  for (let orbiter of orbitee.orbiters) {
    buildLinksRec(orbiter, pairs);
  }
}

function countOrbitsRec(source: BodyNode, depth: number): number {
  let orbits = depth;
  for (let orbiter of source.orbiters) {
    orbits += countOrbitsRec(orbiter, depth + 1);
  }
  return orbits;
}

function part1(): number {
  let pairs: OrbitPair[] = readPairs("./input/day6.txt");
  let COM: BodyNode = { name: "COM", orbiters: [] };
  buildLinksRec(COM, pairs);
  return countOrbitsRec(COM, 0);
}

function part2(): number {
  return -1;
}

export { part1, part2 };
