import DEAD_STATE, {
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
  getNextPoopTime,
} from "./constants";
import { modFox, modScene, togglePoopBag, writeModal } from "./ui";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  scene: 0,
  hungryTime: -1,
  dieTime: -1,
  poopTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  tick() {
    this.clock++;
    console.log(this.clock);

    switch (this.clock) {
      case this.wakeTime:
        this.wake();
        break;
      case this.sleepTime:
        this.sleep();
        break;
      case this.hungryTime:
        this.getHungry();
        break;
      case this.dieTime:
        this.die();
        break;
      case this.timeToStartCelebrating:
        this.startCelebrating();
        break;
      case this.timeToEndCelebrating:
        this.endCelebrating();
        break;
      case this.poopTime:
        this.poop();
        break;
    }

    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal("");
  },
  wake() {
    console.log("hatched " + " day");
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    // Determine if the first scene will be RAIN
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },
  sleep() {
    this.current = "SLEEP";
    this.determineFoxState();
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  },
  getHungry() {
    this.current = "HUNGRY";
    console.log("fox is now hungry");
    this.dieTime = getNextDieTime(this.clock);
    console.log("Next die time:", this.dieTime);
    this.hungryTime = -1;
    modFox("hungry");
  },
  die() {
    console.log("die");
    this.current = "DEAD";
    modFox("dead");
    modScene("dead");
    this.clearTimes();
    writeModal(
      "The fox died: ( </br> Press the middle button to restart the game)"
    );
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
    console.log(this.timeToEndCelebrating);
  },
  endCelebrating() {
    console.log("celebration ended");
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  poop() {
    this.current = "POOPING";
    console.log("Fox needs to poop");
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    console.log("Next die time:", this.dieTime);
    modFox("pooping");
  },
  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }

    if (this.current === "SLEEP") {
      modFox("sleep");
      modScene("night");
    }
  },
  handleUserAction(icon) {
    console.log("current icon is:", icon);
    if (DEAD_STATE.includes(this.current)) {
      // do nothing when in DEAD_STATE.
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    // execute the currently selected action
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("changeWeather");
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },
  cleanUpPoop() {
    console.log("cleanUpPoop");
    if (this.current === "POOPING") {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },
  feed() {
    // can only feed when hungry
    if (this.current !== "HUNGRY") {
      return;
    }
    console.log("fox is eating now");
    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    console.log("next time to poop", this.poopTime);
    modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
};

export default gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
