import { Audio } from "expo-av";

export class OneAv {
  private static _instance: OneAv;
  private _allSounds: Audio.SoundObject[];

  private constructor() {
    this._allSounds = [];
  }

  private loadSounds = async (): Promise<void> => {
    const gameSoundPromise = Audio.Sound.createAsync(require("../assets/music/game.wav"));
    const keySoundPromise = Audio.Sound.createAsync(require("../assets/music/key.wav"));
    const removeSoundPromise = Audio.Sound.createAsync(require("../assets/music/remove.wav"));
    const successSoundPromise = Audio.Sound.createAsync(require("../assets/music/enter.wav"));
    const wrongSoundPromise = Audio.Sound.createAsync(require("../assets/music/wrong.wav"));
    const gameOverSoundPromise = Audio.Sound.createAsync(require("../assets/music/game-over.wav"));
    const gameWonSoundPromise = Audio.Sound.createAsync(require("../assets/music/game-won.wav"));
    const bonusSoundPromise = Audio.Sound.createAsync(require("../assets/music/bonus.wav"));
    const noBonusSoundPromise = Audio.Sound.createAsync(require("../assets/music/nobonus.wav"));
    const clickSoundPromise = Audio.Sound.createAsync(require("../assets/music/click.wav"));

    const allSounds = await Promise.all<Audio.SoundObject>([
      gameSoundPromise,
      keySoundPromise,
      removeSoundPromise,
      successSoundPromise,
      wrongSoundPromise,
      gameOverSoundPromise,
      gameWonSoundPromise,
      bonusSoundPromise,
      noBonusSoundPromise,
      clickSoundPromise,
    ]);

    this._allSounds = allSounds;
  };

  static getInstance = async () => {
    if (this._instance !== undefined) return this._instance;
    this._instance = new OneAv();
    await this._instance.loadSounds();
    return this._instance;
  };

  get all() {
    return this._allSounds;
  }
}
