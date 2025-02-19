import { COLORS } from "./constants/Colors";
import { MayRow, MayRowChar } from "./model/GameData";
import { IRowItemColor } from "./model/RowItemColor";

export const randomItem = <T>(arr: T[]): T => {
  const i = Math.floor(Math.random() * arr.length);
  const item = arr[i];
  return item;
};

export const split = (word: string) => {
  return word.split("");
};

export const getKeyColors = (answer: string[], mays: string[][]): { [key: string]: IRowItemColor } => {
  const char: { [key: string]: IRowItemColor } = {};

  mays.forEach((word) => {
    word.forEach((c, i) => {
      if (!answer.includes(c)) {
        return (char[c] = "darkgray");
      }

      if (c === answer[i]) {
        return (char[c] = "green");
      }

      if (char[c] !== "green") {
        return (char[c] = "yellow");
      }
    });
  });

  return char;
};

export const isBorder = (clueChars: string[]): { [key: string]: boolean } => {
  const char: { [key: string]: boolean } = {};

  if (clueChars.length > 0) {
    clueChars.forEach((c, i) => {
      return (char[c] = true);
    });
  }
  return char;
};

export const getRandomClueChar = (answer: string[], mayRows: MayRow[], clues: string[]): string | undefined => {
  const excludes = [...clues];
  const founds: string[] = mayRows.reduce<string[]>((prev, curr) => {
    curr.chars.forEach((x) => {
      if (0 < x.state && !prev.includes(x.char) && !excludes.includes(x.char)) {
        prev.push(x.char);
      }
    });

    return prev;
  }, []);
  excludes.push(...founds);

  const mayClue = answer.filter((x) => !excludes.includes(x));
  if (0 < mayClue.length) return randomItem(mayClue);

  return;
};

export const howMayFindCharByOneRow = (answer: string[], may: string[]): number => {
  let count = 0;
  if (may && may.length > 0) {
    for (let i = 0; i < may.length; i++) {
      const char = may[i];
      if (answer.includes(char)) {
        count++;
      }
    }
  }
  return count;
};

export const getColor = (color?: string) => {
  if (color === "gray") return COLORS.COMMON.GRAY;
  if (color === "darkgray") return COLORS.COMMON.DARKGRAY;
  if (color === "green") return COLORS.COMMON.GREEN;
  if (color === "yellow") return COLORS.COMMON.YELLOW;
  if (color === "white") return COLORS.COMMON.WHITE;
};

export const deepCopy = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

export const getMayRows = (answer: string[], currentMay: string[]): MayRow => {
  const mayFlag: boolean[] = currentMay.map((_) => false);
  const answerFlag: boolean[] = answer.map((_) => false);

  // initial not found gray
  const mayRow: MayRow = { chars: currentMay.map((x) => ({ char: x, state: 0 })) };

  // Green
  // perfect matches green and flagged true by flagFilled
  mayRow.chars.forEach((mrc: MayRowChar, i) => {
    if (mrc.char === answer[i]) {
      mrc.state = 2;
      mayFlag[i] = true;
      answerFlag[i] = true;
    }
  });

  // Yellow
  mayRow.chars.forEach((mrc: MayRowChar, i) => {
    // green gec
    if (mayFlag[i] === true) return;
    // if (mrc.state === 2) return; // alt

    // find index of includes char AND not green
    const currentCharIndex = answer.findIndex((x, j) => x === mrc.char && answerFlag[j] === false);

    // yellow now
    if (-1 < currentCharIndex) {
      mrc.state = 1;
      mayFlag[i] = true;
      answerFlag[currentCharIndex] = true;
    }
  });

  return mayRow;
};

export const secondsToTime = (e: number) => {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return h + ":" + m + ":" + s;
};
