import { COLORS } from "./constants/Colors";

export type Texts = {
  appName: string;
  languages: string;
  settings: string;
  newGame: string;
  startGame: string;
  mainPage: string;
  submit: string;
  // Settings
  gameSounds: string;

  // Profile
  gameCount: string;
  id: string;

  // Common
  loading: string;
  areYouSure: string;
  leaveMessage: string;
  continue: string;
  exitGame: string;
  seeYouTomorrow: string;
  darkTheme: string;
  serverErrorMessage: string;

  updateRequired: string;
  updateNow: string;

  clueModalHeader: string;
  clueModalText: string;
  clueInfo: string;
  watchADS: string;
  noAdToShow: string;
  noMoreClues: string;
  almostNoClues: string;
  notEnoughLetters: string;
  notInWordList: string;
  youWin: string;
  youLost: string;

  fiveLetters: string;
  sixLetters: string;
  sevenLetters: string;

  // Info
  howToPlay: string;
  howToPlayDesc1: string;
  howToPlayDesc2: string;
  understood: string;

  isNotInTheWord: string;
  correctSpot: string;
  wrongSpot: string;

  examples: string;
  infoFirstRowFirstChar: string;
  infoFirstRowSecondChar: string;
  infoFirstRowThirdChar: string;
  infoFirstRowFourthChar: string;
  infoFirstRowFifthChar: string;

  infoSecondRowFirstChar: string;
  infoSecondRowSecondChar: string;
  infoSecondRowThirdChar: string;
  infoSecondRowFourthChar: string;
  infoSecondRowFifthChar: string;

  infoThirdRowFirstChar: string;
  infoThirdRowSecondChar: string;
  infoThirdRowThirdChar: string;
  infoThirdRowFourthChar: string;
  infoThirdRowFifthChar: string;

  // Game Finished
  won: string;
  played: string;
  time: string;
};

export const SupportedLanguages = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
];

export const SupportedTheme = [
  { code: COLORS.DARK, name: "DARK" },
  { code: COLORS.LIGHT, name: "LIGHT" },
];

export const languages: {
  en: Texts;
  tr: Texts;
} = {
  en: {
    appName: "WORDFIND",
    languages: "Languages",
    settings: "Settings",
    newGame: "NEW GAME",
    startGame: "START GAME",
    mainPage: "MAIN PAGE",
    submit: "SUBMIT",
    // Profile
    gameCount: "Game Count",
    id: "Id",

    // Common
    loading: "Loading..",
    areYouSure: "Are You Sure?",
    leaveMessage: "Your game will not be saved.",
    continue: "Continue",
    exitGame: "Exit Game",
    serverErrorMessage: "Server error.Please try again later.",

    seeYouTomorrow: "See you tomorrow here..",

    darkTheme: "Dark Theme",

    updateRequired: "Please download the latest version.",
    updateNow: "Update Now",

    clueModalHeader: "You have no tips",
    clueModalText: "You can earn more tips by watching ads",
    clueInfo: "You can get letter by using the hint button.",
    watchADS: "Watch Ads",
    noAdToShow: "No ad to show.",
    noMoreClues: "You can't get any more tips",
    almostNoClues: "You can't get a clue, hang in there, you're almost done!",

    notEnoughLetters: "Not Enough Letters",
    notInWordList: "Not In Word List",
    youWin: "You Win!",
    youLost: "You Lost!",

    fiveLetters: "5 Letters",
    sixLetters: "6 Letters",
    sevenLetters: "7 Letters",

    // Info
    howToPlay: "How To Play?",
    howToPlayDesc1: "You need to guess the answer in as many letters as you choose in the start of game.",
    howToPlayDesc2: "After the entered word, the colors of the boxes will change according to the correctness of the answer.",
    understood: "Understood!",

    correctSpot: "is in the word and in the correct spot.",
    wrongSpot: "is in the word but in the wrong spot.",
    isNotInTheWord: "is not in the word.",

    examples: "Examples",
    infoFirstRowFirstChar: "H",
    infoFirstRowSecondChar: "I",
    infoFirstRowThirdChar: "N",
    infoFirstRowFourthChar: "K",
    infoFirstRowFifthChar: "Y",

    infoSecondRowFirstChar: "C",
    infoSecondRowSecondChar: "A",
    infoSecondRowThirdChar: "M",
    infoSecondRowFourthChar: "E",
    infoSecondRowFifthChar: "L",

    infoThirdRowFirstChar: "G",
    infoThirdRowSecondChar: "L",
    infoThirdRowThirdChar: "O",
    infoThirdRowFourthChar: "A",
    infoThirdRowFifthChar: "M",

    // Game Finished
    won: "Won",
    played: "Played",
    time: "Time",

    // Settings
    gameSounds: "Game Sounds",
  },
  tr: {
    appName: "KELİMATOR",
    languages: "Diller",
    settings: "Ayarlar",

    startGame: "OYUNA BAŞLA",
    newGame: "YENİ OYUN",
    mainPage: "ANA SAYFA",
    submit: "DENE",
    // Profile
    gameCount: "Oyun Sayısı",
    id: "Id",

    // Common
    loading: "Yükleniyor..",
    areYouSure: "Emin misin?",
    leaveMessage: "Oyun kaydedilmeyecek.",
    continue: "Devam",
    exitGame: "Oyundan Çık",
    seeYouTomorrow: "Yarın burada görüşmek üzere..",
    serverErrorMessage: "Server hatası. Lütfen daha sonra tekrar deneyiniz.",

    darkTheme: "Koyu Tema",

    updateRequired: "Lütfen son sürümü yükleyiniz.",
    updateNow: "Şimdi Güncelle",

    clueModalHeader: "İpucu haklarınız bitti",
    clueModalText: "Reklam izleyerek daha fazla ipucu hakkı kazanabilirsiniz",
    clueInfo: "İpucu butonunu kullanarak harf alabilirsiniz.",
    watchADS: "Reklam İzle",
    noAdToShow: "Gösterilecek reklam yok.",
    noMoreClues: "Daha fazla ipucu alamazsın.",
    almostNoClues: "İpucu alamazsın, dayan çok az kaldı!",

    notEnoughLetters: "Yetersiz Harf",
    notInWordList: "Kelime listesinde yok",
    youWin: "Kazandınız!",
    youLost: "Kaybettiniz!",

    fiveLetters: "5 Harfli",
    sixLetters: "6 Harfli",
    sevenLetters: "7 Harfli",

    // Info
    howToPlay: "Nasıl Oynanır?",
    howToPlayDesc1: "Oyuna başlarken seçtiğiniz harf sayısı kadar tahmin hakkınız vardır.",
    howToPlayDesc2: "Her tahminden sonra kutucukların renkleri tahmininizin yakınlığına göre değişecektir.",
    understood: "Anladım!",

    correctSpot: "harfi kelimede var ve doğru yerde.",
    wrongSpot: "harfi kelimede var fakat yanlış yerde.",
    isNotInTheWord: "harfi kelimede yok.",

    examples: "Örnekler",
    infoFirstRowFirstChar: "B",
    infoFirstRowSecondChar: "O",
    infoFirstRowThirdChar: "Y",
    infoFirstRowFourthChar: "O",
    infoFirstRowFifthChar: "Z",

    infoSecondRowFirstChar: "E",
    infoSecondRowSecondChar: "K",
    infoSecondRowThirdChar: "M",
    infoSecondRowFourthChar: "E",
    infoSecondRowFifthChar: "K",

    infoThirdRowFirstChar: "İ",
    infoThirdRowSecondChar: "L",
    infoThirdRowThirdChar: "H",
    infoThirdRowFourthChar: "A",
    infoThirdRowFifthChar: "M",

    // Game Finished
    won: "Kazanılan",
    played: "Oynanan",
    time: "Süre",

    // Settings
    gameSounds: "Oyun Sesleri",
  },
};
