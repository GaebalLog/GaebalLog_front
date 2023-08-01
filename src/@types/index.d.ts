import type { COLOR_VARIANT } from "@/constants/global/colors";

declare global {
  type etcColor = "etcA" | "etcB";
  type color = keyof typeof COLOR_VARIANT | etcColor;
}
