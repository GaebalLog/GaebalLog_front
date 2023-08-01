import { useRecoilValue } from "recoil";

import { COLOR_VARIANT } from "@/constants/global/colors";
import { darkAtom } from "@/constants/global/atoms";

interface colorProps {
  bgColor?: color;
  color?: color;
}

const useColor = ({ bgColor, color }: colorProps) => {
  const dark = useRecoilValue(darkAtom);

  const DARKABLE_COLOR_VARIANT = {
    black: [COLOR_VARIANT.black, COLOR_VARIANT.white],
    black100: [COLOR_VARIANT.black100, COLOR_VARIANT.white100],
    black200: [COLOR_VARIANT.black200, COLOR_VARIANT.white200],
    black300: [COLOR_VARIANT.black300, COLOR_VARIANT.white300],
    black400: [COLOR_VARIANT.black400, COLOR_VARIANT.white400],
    black500: [COLOR_VARIANT.black500, COLOR_VARIANT.white500],
    black600: [COLOR_VARIANT.black600, COLOR_VARIANT.white600],
    black700: [COLOR_VARIANT.black700, COLOR_VARIANT.white700],
    white: [COLOR_VARIANT.white, COLOR_VARIANT.black],
    white100: [COLOR_VARIANT.white100, COLOR_VARIANT.black100],
    white200: [COLOR_VARIANT.white200, COLOR_VARIANT.black200],
    white300: [COLOR_VARIANT.white300, COLOR_VARIANT.black300],
    white400: [COLOR_VARIANT.white400, COLOR_VARIANT.black400],
    white500: [COLOR_VARIANT.white500, COLOR_VARIANT.black500],
    white600: [COLOR_VARIANT.white600, COLOR_VARIANT.black600],
    white700: [COLOR_VARIANT.white700, COLOR_VARIANT.black700],
    neutral100: [COLOR_VARIANT.neutral100, COLOR_VARIANT.neutral100],
    neutral200: [COLOR_VARIANT.neutral200, COLOR_VARIANT.neutral200],
    neutral300: [COLOR_VARIANT.neutral300, COLOR_VARIANT.neutral300],
    neutral400: [COLOR_VARIANT.neutral400, COLOR_VARIANT.neutral400],
    neutral500: [COLOR_VARIANT.neutral500, COLOR_VARIANT.neutral500],
    neutral600: [COLOR_VARIANT.neutral600, COLOR_VARIANT.neutral600],
    yellow: [COLOR_VARIANT.yellow, COLOR_VARIANT.yellow],
    purple: [COLOR_VARIANT.purple, COLOR_VARIANT.purple],
    blue: [COLOR_VARIANT.blue, COLOR_VARIANT.blue],
    background: [COLOR_VARIANT.white, COLOR_VARIANT.background],
    categoryButton: [COLOR_VARIANT.white, COLOR_VARIANT.neutral500],
    etcB: [COLOR_VARIANT.white, COLOR_VARIANT.black700],
  };

  // 컴포넌트에서 import => const { bgColorClass, textColorClass } = useColor({ bgColor, color})
  //                       const { bgColorClass } = useColor({ bgColor: "black" });
  // className={`bg-[${bgColorClass}] text-[${textColorClass}]`} 형식으로 사용
  return {
    bgColorClass: bgColor ? DARKABLE_COLOR_VARIANT[bgColor][dark] : "",
    textColorClass: color ? DARKABLE_COLOR_VARIANT[color][dark] : "",
  };
};

export default useColor;
