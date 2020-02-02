import { CollisionResolutionStrategy } from "excalibur";

const x = -3;
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
]

const lifegoals = [
  [2, 2, 2, 2, 2, 2],
  [2, p, 0, 0, 4, 2],
  [2, 2, r, 2, 0, 2],
  [2, 0, 0, 0, 0, 2],
  [2, x, 0, 0, 4, 2],
  [2, 2, 2, 2, 2, 2],
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
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [2, p, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [2, 4, r, 0, r, r, r, 0, 0, 2, 0],
  [2, 2, x, x, x, r, x, 2, 0, 2, 0],
  [2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [2, 0, 0, r, 4, 0, 0, r, 0, 2, 0],
  [2, 0, 0, r, 0, r, r, 0, 0, 2, 0],
  [2, 0, 0, r, 0, 5, 0, 0, 0, 2, 0],
  [2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 2, 0, r, x, r, 0, 2, 0, 2],
  [2, 0, 0, r, 0, r, r, 0, 5, x, 2],
  [2, 0, 2, 0, 0, r, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const sokoban3 = [
  [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 0, r, 0, 0, 0, r, 0, 0, 2, 0],
  [0, 2, p, x, x, x, r, x, x, 0, 2, 0],
  [0, 2, 0, r, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, x, x, x, x, x, x, r, 2, 0],
  [2, 2, 0, 0, r, 0, 0, 0, 0, 0, 2, 2],
  [2, 0, 0, 0, r, 0, r, r, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [0, 2, 0, 0, 4, 0, 5, 0, 3, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, r, 6, r, 0, r, 0, 2, 0],
  [0, 2, 0, 4, r, 0, r, 0, r, 5, 2, 0],
  [0, 2, 0, 0, r, 0, r, 6, r, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
];

const alone3 = [
  [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
  [0, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 2],
  [0, 2, x, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, r, 0, 2, 2],
  [0, 2, x, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, r, r, 2, 0],
  [0, 2, x, 0, 0, 0, 0, 0, 0, r, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0],
  [0, 2, x, 0, 4, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, p, 2, 2],
  [2, 2, x, x, 0, 0, r, 0, r, 0, 0, 0, 2],
  [2, 0, 0, r, 0, 0, 0, 0, r, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

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

const pureban = [
  [0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 0, 0, 0, 2],
  [2, x, 0, p, 0, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 0, 2, 2],
  [2, 0, 0, 0, 0, 0, 2, 0, x, 2],
  [2, 2, 0, 0, r, 0, 2, 0, r, 2],
  [2, 0, 0, 0, r, 0, r, 0, x, 2],
  [2, r, 0, r, r, r, 0, 0, x, 2],
  [2, 0, 0, r, 0, 0, 0, 0, x, 2],
  [2, 0, r, 0, r, x, x, x, x, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

const familiar = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,0,0,2,2,2,2,2,2],
  [2,2,x,2,2,0,0,0,0,0,0,0,0,0,2],
  [2,2,x,2,2,0,0,r,0,0,2,r,0,0,2],
  [2,2,x,2,2,2,0,2,2,2,2,0,0,2,2],
  [2,2,0,0,2,2,0,2,2,2,2,2,0,2,2],
  [2,2,0,0,0,0,r,0,2,2,2,2,0,2,2],
  [2,2,0,0,2,2,0,r,2,2,0,r,0,2,2],
  [2,2,x,2,2,p,r,0,0,0,0,0,0,2,2],
  [2,2,x,2,2,2,2,2,2,2,0,2,0,2,2],
  [2,2,x,2,2,2,2,2,2,2,0,0,0,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

<<<<<<< HEAD
const Vinni =  [
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, x, x, x, x, 2, 2, 2, 2, 2],
  [2, 0, r, 0, 0, p, 5, 0, r, r, 4, r, 0, 2],
  [2, x, r, x, 0, x, 0, x, 0, r, 5, r, 0, 2],
  [2, x, 0, x, 0, x, 0, x, 0, 0, 6, r, 0, 2],
  [2, x, r, x, 0, x, 0, x, 0, 0, 7, r, 0, 2],
  [2, 0, 0, 2, 0, 0, r, 0, 0, 0, 2, r, r, 2],
  [2, 0, 0, 0, 0, r, 0, 0, 7, 4, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2],
  [2, 0, r, r, r, r, r, r, r, r, r, r, 0, 2],
  [2, 0, r, 0, 0, 0, r, 0, 0, 0, 0, r, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]
=======
>>>>>>> 4e19f17ed3216e6d1c5c21ff14b8bd9ae405f26d

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
  "02": [lifegoals, "Life goals"],
  "03": [orderMatters, "Order matters..."],
  "04": [sokoban1, "Sokoban"],
  "05": [sokoban2, "Too"],
  "06": [sokoban3, "TVT"],
  "07": [alone3, "kellari"],
  "10": [sokobanStar, "Star"],
  "11": [pureban, "dayjob"],
  "12": [familiar, "Somehow familiar"],
  "13": [Vinni, "Penthouse"],
  //"91": doubleRockTest,
  //"92": rockOnCableTest,
  "99": [EndScreen, ""],
};

export const mapOrder = Object.keys(maps).sort().reverse();
