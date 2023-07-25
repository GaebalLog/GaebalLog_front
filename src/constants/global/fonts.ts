import { Gothic_A1 } from "next/font/google";
const gothic = Gothic_A1({ subsets: ["latin"], weight: "400" });

const FONT_WEIGHT = {
  bold: `font-bold`,
};

export const FONT_FAMILY = {
  gothic: `${gothic.className}`,
  hack: `font-hack`,
};

export const TYPOGRAPH_VARIANT = {
  header: `text-[24px] ${FONT_FAMILY.hack}`,
  button1: `text-[32px] ${FONT_FAMILY.hack}`,
  button2: `text-[24px]`,
  button3: `text-[20px]`,
  button4: `text-[16px]`,
  body1: `text-[24px] ${FONT_WEIGHT.bold}`,
  body2: `text-[16px]`,
};