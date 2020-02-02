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
  [0, 2, 0, 0, 4, 0, 5, 0, 0, 0, 2, 0],
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

const Vinni =  [
  [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, x, x, x, x, 2, 2, 2, 2, 2],
  [2, 0, r, 0, 0, p, 5, 0, r, r, 4, r, 0, 2],
  [2, x, r, x, 0, x, 0, x, 0, r, 5, 6, 0, 2],
  [2, x, 0, x, 0, x, 0, x, 0, 0, 6, r, 0, 2],
  [2, x, r, x, 0, x, 0, x, 0, 0, 7, r, 0, 2],
  [2, 0, 0, 2, 0, 0, r, 0, 0, 0, 2, r, r, 2],
  [2, 0, 0, 0, 0, r, 0, 0, 7, 4, 0, r, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2],
  [2, 0, r, r, r, r, r, r, r, r, r, r, 0, 2],
  [2, 0, r, 0, 0, 0, r, 0, 0, 0, 0, r, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

const roadout = [
  [2, 2, 2, 0, 0, 0, 2, 2, 2, 2,],
  [2, 2, 2, 0, r, 0, 2, 2, 2, 2,],
  [p, 2, 2, 0, 0, 0, 2, 2, 2, 2,],
  [0, 2, 2, r, 2, 2, 2, 0, 0, 0,],
  [0, r, 0, 0, r, 0, x, x, x, 0,],
  [0, 2, 0, 0, 0, 2, x, x, x, 2,],
  [0, 2, 0, 2, 0, 2, 2, 2, 2, 2,],
  [0, r, 0, 0, 0, 0, 0, 2, 2, 2,],
  [2, 0, 0, 2, 2, r, 0, 2, 2, 2,],
  [2, 2, 2, 2, 2, 0, 0, 2, 2, 2,],
];

const roadout2 = [
  [x, x, x, 0, 2, 2, 2, 2,],
  [x, x, x, 0, 0, 0, 0, 2,],
  [0, 0, r, 0, r, 0, 0, 2,],
  [2, 2, 2, r, 2, 2, 2, 2,],
  [0, p, r, 0, 0, 2, 2, 2,],
  [0, 2, 0, r, 0, 0, 2, 2,],
  [0, 0, r, 0, 0, 0, 2, 2,],
  [2, 2, 0, 0, 2, 2, 2, 2,],
  [2, 2, 2, 2, 2, 0, 2, 2,],
  [2, 2, 2, 2, 2, 2, 2, 2,],
]

const roadout3 = [
  [2,2,0,0,0,2,2,2,2,2,2,2,2,2,2],
  [2,2,0,2,0,2,2,2,2,2,2,2,2,2,2],
  [2,2,6,4,0,2,0,0,0,2,2,2,2,2,2],
  [2,2,0,0,0,0,0,0,0,2,2,0,0,0,2],
  [2,2,2,0,2,2,2,0,2,0,0,0,0,0,2],
  [2,2,2,0,2,0,0,r,0,r,0,2,x,x,2],
  [2,2,2,0,2,0,2,0,2,0,0,2,x,x,2],
  [2,0,4,r,0,0,2,p,2,2,2,2,x,x,2],
  [2,0,2,0,2,r,2,r,2,2,2,2,x,x,2],
  [2,0,5,0,0,0,2,0,2,2,2,2,2,2,2],
  [2,2,2,2,2,0,2,0,2,2,0,0,0,2,2],
  [2,2,2,2,2,0,2,0,2,0,r,0,6,2,2],
  [2,2,2,2,0,0,0,0,0,r,0,0,2,2,2],
  [2,2,2,2,0,0,0,5,2,0,0,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
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

export const maps: {[id: string]: [number[][], string, string?, string?, string?]} = {
  "00": [helloWorld, "Practicing at home", "You're playing guitar alone at home. Connect the red squares.", "You're so stoked you got in a band!"],
  "01": [introduction, "Band training", "The band's practicing in a cramped basement. The drummer flaked. Connect each color.", "bassist: \"I have to see a man about a dog.\"", "box"],
  "02": [lifegoals, "After hours", "The bassist had to go too. You do some rearranging and stay to practice. Move the box onto the X.", "Big day next weekend!", "box"],
  "03": [orderMatters, "On tour!", "So apparently the bassist got you a new lead guitarist. And you're late for the gig. bassist: \"Everyone's the roadie\"... Do not cross the streams! Press r to restart.", "Just look at them go!", "box"],
  "04": [roadout, "After the gig", "They broke a leg! Looks like you're everyone again, get the stuff in the van", "Can't wait to get to the hotel for a beer with the crew!", "box"],
  "05": [sokoban1, "Warehouse blues", "You're itching to play, but the rest of the band locked the door. You set up your guitar in some storage space.", "Wonder what the guys were giggling about in there...", "crate"],
  "06": [sokoban2, "Blind trial", "You take a side job for a scientific study on telepathic guitarists playing in time. One of them looks like a bassist, though.", "Wow, they really are in time!", "box"],
  "07": [sokoban3, "Dancehall", "You get to arrange the seating now, too!", "You feel useful."],
  "08": [alone3, "Warehouse swing", "Tidying up for another gig, you have a minute to practice.", "\"Nobody knows the trouble I've seen\"...", "crate"],
  "09": [sokobanStar, "Wedding gig", "The band's a surprise. You're running the cables discreetly.", "The bride was in tears! You have something in your eye, too.", "crate"],
  "10": [roadout2, "Unforgettable", "Weddings always make you so emotional", "You just can't get the view of them playing out of your mind", "box"],
  "11": [pureban, "Dayjob", "You can't concentrate at work. The gig's all you can think about", "You've memorized all of the songs just in case", "crate"],
  "12": [familiar, "Somehow familiar", "Until you're reminded of something faintly familiar", "Super perplexing...", "crate"],
  "13": [Vinni, "Penthouse", "This is it! The final gig! The hall's going to be packed!", "What a tour! If only you got to play..."],
  "14": [roadout3, "aoeu", "aoeu", "aoeu"],
  //"91": doubleRockTest,
  //"92": rockOnCableTest,
  //"99": [EndScreen, ""],
};

export const mapOrder = Object.keys(maps).sort().reverse();
