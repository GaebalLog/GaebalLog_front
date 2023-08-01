import type { COLOR_VARIANT } from "@/constants/global/colors";

declare global {
  type etcColor = "categoryButton" | "etcB";
  type color = keyof typeof COLOR_VARIANT | etcColor;
}
