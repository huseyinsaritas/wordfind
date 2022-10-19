import Sound from "react-native-sound";

const gameSound = new Sound(require("../../assets/music/game.wav"));
const keySound = new Sound(require("../../assets/music/key.wav"));
const removeSound = new Sound(require("../../assets/music/remove.wav"));
const successSound = new Sound(require("../../assets/music/enter.wav"));
const wrongSound = new Sound(require("../../assets/music/wrong.wav"));
const gameOverSound = new Sound(require("../../assets/music/game-over2.wav"));
const gameWonSound = new Sound(require("../../assets/music/game-won.wav"));
const bonusSound = new Sound(require("../../assets/music/bonus.wav"));
const noBonusSound = new Sound(require("../../assets/music/nobonus.wav"));
const clickSound = new Sound(require("../../assets/music/click2.wav"));

export const sounds = {
  game: gameSound,
  key: keySound,
  remove: removeSound,
  success: successSound,
  wrong: wrongSound,
  gameOver: gameOverSound,
  gameWon: gameWonSound,
  bonus: bonusSound,
  noBonus: noBonusSound,
  click: clickSound,
};
