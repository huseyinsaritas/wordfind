export type MayRowChar = {
  char: string;
  state: 0 | 1 | 2; // bulunamadı | bulundu ama yerinde değil | yerinde ve bulundu
};
export type MayRow = {
  chars: MayRowChar[];
};

export type IGameData = {
  answer: string[];
  mays: MayRow[];
  currentMay: string[];
};
