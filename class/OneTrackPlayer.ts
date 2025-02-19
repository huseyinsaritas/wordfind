import TrackPlayer, { Capability, Track } from "react-native-track-player";

export class OneTrackPlayer {
  private static _instance: OneTrackPlayer;
  private static _isInitialized = false;
  private _soundFiles: { [key: string]: number } = {};

  private constructor() {}

  // ✅ **TrackPlayer'ı Başlatma**
  private async setupTrackPlayer(): Promise<void> {
    if (OneTrackPlayer._isInitialized) {
      console.log("⚠️ TrackPlayer already initialized.");
      return;
    }

    console.log("🔄 Initializing TrackPlayer...");
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stoppingAppPausesPlayback: true,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      OneTrackPlayer._isInitialized = true;
      console.log("🎵 TrackPlayer initialized successfully.");
    } catch (error) {
      console.error("❌ Error during TrackPlayer setup:", error);
    }
  }

  // ✅ **Tüm Sesleri Yükleme**
  // private async loadSounds(): Promise<void> {
  //   // console.log("🔄 Sesler yükleniyor...");

  //   const soundFiles: Record<string, any> = {
  //     game: require("../assets/music/game.wav"),
  //     key: require("../assets/music/key.wav"),
  //     remove: require("../assets/music/remove.wav"),
  //     success: require("../assets/music/enter.wav"),
  //     wrong: require("../assets/music/wrong.wav"),
  //     gameOver: require("../assets/music/game-over.wav"),
  //     gameWon: require("../assets/music/game-won.wav"),
  //     bonus: require("../assets/music/bonus.wav"),
  //     noBonus: require("../assets/music/nobonus.wav"),
  //     click: require("../assets/music/click.wav"),
  //   };

  //   await TrackPlayer.reset(); // **Eski çalma listesini temizle**

  //   let trackIndex = 0;
  //   for (const key in soundFiles) {
  //     const track: Track = {
  //       id: trackIndex,
  //       url: soundFiles[key],
  //       title: key,
  //       artist: "System",
  //     };
  //     await TrackPlayer.add([track]);
  //     this._soundFiles[key] = trackIndex;
  //     // console.log(`✅ Yüklendi: ${key} (ID: ${trackIndex})`);
  //     trackIndex++;
  //   }

  //   // console.log("🎵 Tüm sesler başarıyla yüklendi!");
  // }

  // ✅ **(Singleton)**
  static async getInstance(): Promise<OneTrackPlayer> {
    if (!this._instance) {
      this._instance = new OneTrackPlayer();
      await this._instance.setupTrackPlayer();
      // await this._instance.loadSounds();
    }
    return this._instance;
  }

  getAllSoundIds() {
    return this._soundFiles;
  }

  // ✅ **Ses Çalma Fonksiyonu**
  async play(soundName: keyof typeof this._soundFiles) {
    try {
      if (this._soundFiles[soundName] === undefined) {
        console.error(`🚨 Ses "${soundName}" bulunamadı!`);
        return;
      }

      const trackId = this._soundFiles[soundName];
      // console.log("🎵 Çalınacak Track ID:", trackId, typeof trackId);

      await TrackPlayer.skip(trackId);
      // console.log("✅ Skip başarılı");

      await TrackPlayer.play();
      // console.log("✅ Çalma başarılı");
    } catch (error) {
      console.error(`❌ Hata "${soundName}" çalınırken:`, error);
    }
  }

  // ✅ **Tüm Sesleri Temizleme**
  async unloadAll() {
    // console.log("🧹 TrackPlayer'daki sesler temizleniyor...");
    await TrackPlayer.reset(); // ✅ **Tüm sesleri sıfırla**
    this._soundFiles = {}; // ✅ **Track ID'leri temizle**
  }
}
