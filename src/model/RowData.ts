import { COLORS } from "../const";

const ROW_ITEM_COLOR = {
  GRAY: COLORS.GRAY,
  YELLOW: COLORS.YELLOW,
  GREEN: COLORS.GREEN,
  DARKGRAY: COLORS.DARKGRAY,
};

export type IRowItem = {
  char: string;
  color: typeof ROW_ITEM_COLOR;
};

export type IRowData = IRowItem[];
