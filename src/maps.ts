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
  [2, 2, 2, 0, 2, 2, 2],
];

const orderMatters = [
  [0, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 5, 0, 0, 0, 0, 2],
  [2, 4, p, 0, 0, 4, 0, 2],
  [2, 2, 5, r, 0, 0, 0, 2],
  [0, 2, 2, 6, 0, 6, 2, 2],
  [0, 0, 2, 2, 2, 2, 2, 0],
];

const doubleRockTest = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 4, p, 0, r, r, 4, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const rockOnCableTest = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 4, p, 0, 0, 0, 0, 4, 2],
  [2, 2, 0, 2, r, 2, 2, 0, 2],
  [0, 2, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2],
];

export const maps = {
  0: helloWorld,
  1: introduction,
  2: orderMatters,
  12: doubleRockTest,
  13: rockOnCableTest
};

export const mapOrder = Object.keys(maps).sort().reverse();
