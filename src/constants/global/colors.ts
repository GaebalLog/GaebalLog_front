/**
 * @description
 * 색상 디자인 시스템
 * @example
 * import { BG_COLOR } from 'constants/global/colors';
 *
 * const Test: React.FC<{ type: bgColor }> = ({ type }) => {
 *  const style = BG_COLOR[type];
 *  return <div className={`${style} w-5 h-5`}>text</div>;
 * };
 */

export const BG_COLOR = {
  primary: "bg-[#FFFFFF] dark:bg-[#000000]",
  inverse: "bg-[#000000] dark:bg-[#FFFFFF]",
  background: "bg-[#FFFFFF] dark:bg-[#121212]",
  general01: "bg-[#F5F5F5] dark:bg-[#282828]",
  general02: "bg-[#F4F4F4] dark:bg-[#202020]",
  general03: "bg-[#DCDCDC] dark:bg-[#2A2A2A]",
  general04: "bg-[#D9D9D9] dark:bg-[#363636]",
  general05: "bg-[#D3D3D3] dark:bg-[#6A6A6A]",
  general06: "bg-[#888888] dark:bg-[#9A9A9A]",
  general07: "bg-[#48483F] dark:bg-[#ECECEC]",
  etcColor01: "bg-[#FFFFFF] dark:bg-[#4D4D4D]",
  accentYellow: "bg-[#DFAE3D] dark:bg-[#DFAE3D]",
  accentPurple: "bg-[#967AC3] dark:bg-[#967AC3]",
  accentBlue: "bg-[#7ECDF3] dark:bg-[#7ECDF3]",
};

export const TEXT_COLOR = {
  primary: "text-[#000000] dark:text-[#FFFFFF]",
  inverse: "text-[#FFFFFF] dark:text-[#000000]",
  text: "text-[#121212] dark:text-[#FFFFFF]",
  general01: "text-[#282828] dark:text-[#F5F5F5]",
  general02: "text-[#202020] dark:text-[#F4F4F4]",
  general03: "text-[#2A2A2A] dark:text-[#DCDCDC]",
  general04: "text-[#363636] dark:text-[#D9D9D9]",
  general05: "text-[#6A6A6A] dark:text-[#D3D3D3]",
  general06: "text-[#9A9A9A] dark:text-[#888888]",
  general07: "text-[#ECECEC] dark:text-[#48483F]",
  etcColor01: "text-[#4D4D4D] dark:text-[#FFFFFF]",
  accentYellow: "text-[#DFAE3D] dark:text-[#DFAE3D]",
  accentPurple: "text-[#967AC3] dark:text-[#967AC3]",
  accentBlue: "text-[#7ECDF3] dark:text-[#7ECDF3]",
};
