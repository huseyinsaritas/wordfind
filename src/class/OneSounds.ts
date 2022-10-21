import Sound from "react-native-sound";

export class OneSounds {
  private static _instance: OneSounds;
  private _allSounds: Sound[];

  private constructor() {
    this._allSounds = [];
  }

  private loadSounds = async (): Promise<void> => {
    const gameSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/game.wav"), (err: any) => {
        if (err) {
          console.error("gameSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const keySoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/key.wav"), (err: any) => {
        if (err) {
          console.error("keySoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const removeSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/remove.wav"), (err: any) => {
        if (err) {
          console.error("removeSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const successSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/enter.wav"), (err: any) => {
        if (err) {
          console.error("successSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const wrongSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/wrong.wav"), (err: any) => {
        if (err) {
          console.error("wrongSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const gameOverSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/game-over2.wav"), (err: any) => {
        if (err) {
          console.error("gameOverSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const gameWonSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/game-won.wav"), (err: any) => {
        if (err) {
          console.error("gameWonSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const bonusSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/bonus.wav"), (err: any) => {
        if (err) {
          console.error("bonusSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const noBonusSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/nobonus.wav"), (err: any) => {
        if (err) {
          console.error("noBonusSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });
    const clickSoundPromise = new Promise<Sound>((resolve) => {
      const s = new Sound(require("../../assets/music/click2.wav"), (err: any) => {
        if (err) {
          console.error("clickSoundPromise.load.err", err);
        }
        resolve(s);
      });
    });

    const allSounds = await Promise.all<Sound>([
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
    this._instance = new OneSounds();
    await this._instance.loadSounds();
    return this._instance;
  };

  get all() {
    return this._allSounds;
  }
}
