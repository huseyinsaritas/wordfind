import { COLORS } from "../constants/Colors";
import { MayRow, MayRowChar } from "../model/GameData";
import { IRowItemColor } from "../model/RowItemColor";

export const randomItem = <T>(arr: T[]): T => {
  const i = Math.floor(Math.random() * arr.length);
  const item = arr[i];
  return item;
};

export const split = (word: string) => {
  return word.split("");
};

/* export const getRowColors = (answer: string[], may: string[]): IRowItemColor[] => {
  const flagFilled: boolean[] = answer.map((_) => false);

  const colors: IRowItemColor[] = Array.from(Array(may.length));

  may.forEach((c, i) => {
    if (c === answer[i]) {
      colors[i] = "green";
      flagFilled[i] = true;
      return;
    }
  });

  may.forEach((c, i) => {
    if (colors[i]) return;

    if (!answer.includes(c)) {
      colors[i] = "darkgray";
      return;
    }

    const currentCharIndex = answer.findIndex((x, index) => x === c && !flagFilled[index]);

    if (currentCharIndex > -1) {
      colors[i] = "yellow";
      flagFilled[currentCharIndex] = true;
      return;
    } else {
      colors[i] = "darkgray";
      return;
    }
  });

  return colors;
}; */

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

export const getRandomClueChar = (answer: string[], mays: string[][], clueChars: string[]): string | undefined => {
  let knownLettersNumber = 0;
  if (mays.length > 0) {
    for (let index = 0; index < mays.length; index++) {
      const may = mays[index];
      may.filter((m) => {
        if (answer.includes(m)) knownLettersNumber++;
      });
    }
  }

  if (answer.length > clueChars.length) {
    const uniqueAnswerItems = answer.filter((o) => clueChars.indexOf(o) === -1);
    const char = uniqueAnswerItems[Math.floor(Math.random() * uniqueAnswerItems.length)];
    return char;
  }
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
  if (color === "gray") return COLORS.COMMON.COLOR_TONE2;
  if (color === "darkgray") return COLORS.COMMON.COLOR_TONE4;
  if (color === "green") return COLORS.COMMON.DARKANDGREEN;
  if (color === "yellow") return COLORS.COMMON.YELLOW;
  if (color === "white") return COLORS.COMMON.COLOR_TONE1;
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

/* export const getMayRowsEx = (answer: string[], currentMay: string[]): MayRowChar[] => {
  // const result: MayRow = { chars: [] };

  const mayRowChars = [];

  for (let i = 0; i < currentMay.length; i++) {
    const c = currentMay[i];
    const mayRowChar: MayRowChar = { char: c, state: 0 };

    if (answer[i] === c) {
      mayRowChar.state = 2;
    } else if (answer.includes(c)) {
      mayRowChar.state = 1;
    }
    mayRowChars.push(mayRowChar);
  }

  return mayRowChars;
}; */

/* export const getColors = (mays: MayRow[]): { [key: string]: IRowItemColor } => {
  const char: { [key: string]: IRowItemColor } = {};

  mays.forEach((may) => {
    may.chars.forEach((c: MayRowChar, i) => {
      if (c.state === 0) {
        return (char[i] = "darkgray");
      }

      if (c.state === 1) {
        return (char[i] = "yellow");
      }

      if (c.state === 2) {
        return (char[i] = "green");
      }
    });
  });
  console.log("char", char);

  return char;
}; */
