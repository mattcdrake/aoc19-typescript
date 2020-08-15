import * as fs from "fs";

let pairs: OrbitPair[] = readPairs("./input/day6.txt");
let COM: BodyNode = { name: "COM", orbiting: null, orbiters: [] };
buildLinksRec(COM, pairs);

interface BodyNode {
  name: string;
  orbiting: BodyNode;
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

function findNode(root: BodyNode, targetName: string): BodyNode {
  if (root.name === targetName) {
    return root;
  }
  for (let orbiter of root.orbiters) {
    let searchResult = findNode(orbiter, targetName);
    if (searchResult) {
      return searchResult;
    }
  }
  return null;
}

// This also deletes the pair from `pairs`.
function addOrbitersToNode(orbitee: BodyNode, pairs: OrbitPair[]): void {
  for (let i = 0; i < pairs.length; ++i) {
    if (pairs[i].orbitee === orbitee.name) {
      orbitee.orbiters.push({
        name: pairs[i].orbiter,
        orbiting: orbitee,
        orbiters: [],
      });
      pairs.splice(i, 1);
      i--;
    }
  }
}

function buildPathToCOM(source: BodyNode): BodyNode[] {
  let path: BodyNode[] = [];
  source = source.orbiting;
  while (source.name !== "COM") {
    path.push(source);
    source = source.orbiting;
  }
  return path;
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

function findStepsToCommonNode(node1: BodyNode[], node2: BodyNode[]): number {
  for (let i = 0; i < node1.length; ++i) {
    let curnode = node1[i];
    for (let j = 0; j < node2.length; ++j) {
      if (curnode.name === node2[j].name) {
        return i + j;
      }
    }
  }
  return -1;
}

function part1(): number {
  return countOrbitsRec(COM, 0);
}

function part2(): number {
  let you = findNode(COM, "YOU");
  let santa = findNode(COM, "SAN");
  let youPath = buildPathToCOM(you);
  let santaPath = buildPathToCOM(santa);
  return findStepsToCommonNode(youPath, santaPath);
}

export { part1, part2 };
