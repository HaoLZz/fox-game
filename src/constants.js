export const ICONS = ["fish", "poop", "weather"];
export const TICK_RATE = 3000;
export const SCENES = ["sunny", "rain"];
export const RAIN_CHANCE = 0.2;

export const DAY_LENGTH = 40;
export const NIGHT_LENGTH = 20;

export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 3) + 3 + clock;
export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;

const DEAD_STATE = ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"];
export default DEAD_STATE;
