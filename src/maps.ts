const p = -2;
const r = -1;

const helloWorld = [
  [2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 4, 2, 2, 2],
  [2, 2, p, 0, 0, 2, 2],
  [2, 2, 0, 0, 0, 2, 2],
  [2, 2, 2, 4, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
];

const introduction = [
  [2, 2, 2, 2, 2, 2, 2],
  [2, p, 0, 0, 0, 5, 2],
  [2, 2, r, 2, 0, 4, 2],
  [2, 0, 0, 0, 0, 2, 2],
  [2, 5, 2, 2, 4, 2, 2],
  [2, 2, 2, 2, 2, 2, 2],
];

const orderMatters = [
  [0, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 5, 0, 0, 0, 0, 2],
  [2, 4, p, 0, 0, 4, 0, 2],
  [2, 2, 5, r, 0, 0, 0, 2],
  [0, 2, 2, 6, 0, 6, 2, 2],
  [0, 0, 2, 2, 2, 2, 2, 0],
];

const sokoban1 = [
  [0, 2, 2, 2, 2, 2, 2, 2, 2],
  [0, 2, 0, 0, 2, 0, 4, 0, 2],
  [0, 2, p, r, 0, r, 0, r, 2],
  [2, 2, 2, 0, 2, r, 0, 0, 2],
  [2, 0, 2, 2, 0, r, 0, 0, 2],
  [2, 0, 0, 2, 2, 0, r, r, 2],
  [2, 0, 4, r, 0, 0, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const sokoban2 = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, p, 0, 0, 0, 0, 0, 2, 0, 2],
  [2, 4, r, 0, r, r, r, 0, 0, 2],
  [2, 2, 0, 0, 0, r, 0, 2, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 0, 2],
  [2, 0, 0, r, 4, 0, 0, r, 0, 2],
  [2, 0, 0, r, 0, r, r, 0, 0, 2],
  [2, 0, 0, r, 0, 5, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 2, 0, r, 0, r, 0, 2, 0],
  [2, 0, 0, r, 0, r, r, 0, 5, 0],
  [2, 0, 2, 0, 0, r, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const sokobanStar = [
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 7, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 4, 0, r, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, r, 0, 0, 0, r, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, r, r, r, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, r, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2 ,2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, r, 5, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 7, 2, 0, 5, 2],
  [2, 6, 0, 0, 0, r, 2, 0, 2, 0, 0, 0, r, 0, 0, 2, 0, 0, 2],
  [2, 2, r, 2, 2, 0, 0, 0, 2, 2, p, 0, 2, r, 2, 2, 0, 2, 2],
  [2, 0, 0, 0, r, 0, 0, 0, 0, 0, r, 0, 0, 0, 0, 0, 0, 2, 2],
  [2, 2, 2, 2 ,2, 0, 2, r, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, r, 2, 2, 0, 2, r, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 4, 0, 0, 0, r, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 6, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0],
];

const doubleRockTest = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 4, p, 0, 0, r, 4, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const rockOnCableTest = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 4, p, 0, 0, 0, 0, 4, 2],
  [2, 2, 0, 2, r, 2, 2, 0, 2],
  [0, 2, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const EndScreen = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2],
  [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 2, p, 0, 2, 2, 0, 0, 2],
  [2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

export const maps: {[id: string]: [number[][], string]} = {
  "00": [helloWorld, "Hello world!"],
  "01": [introduction, "Introduction"],
  "02": [orderMatters, "Order matters..."],
  "03": [sokoban1, "Sokoban"],
  "04": [sokoban2, "Too"],
  "10": [sokobanStar, "Star"],
  //"91": doubleRockTest,
  //"92": rockOnCableTest,
  "99": [EndScreen, ""],
};

export const mapOrder = Object.keys(maps).sort().reverse();
