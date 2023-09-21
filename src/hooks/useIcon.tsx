import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import ICON from "../../public/assets/icons/common";

import { darkAtom } from "./useUserAuth";

const useIcon = () => {
  const dark = useRecoilValue(darkAtom);
  /**
   *
   * @description
   * useIcon은 아이콘을 가져오는 커스텀 훅입니다.
   * @param
   * name: 아이콘 이름
   * width: 아이콘 너비
   * height: 아이콘 높이
   * option: 아이콘 옵션
   * @example
   * import React from "react";
   * import useIcon from "@/hooks/useIcon";
   *
   * const example = () => {
   *  const { getIcon } = useIcon();
   *  const Alarm = getIcon("alarm", 18, 22);
   *  return (
   *    <div>{Alarm}</div>
   *  );
   * };
   * export default NotLoggedInBox;
   */
  const getIcon = (
    name: keyof typeof ICON,
    width: number,
    height: number,
    option?: "cursor" | "hover" | "cursor hover",
  ): React.ReactElement => {
    const source = ICON[name][dark];
    return (
      <Image
        src={source}
        alt={name}
        width={width}
        height={height}
        className={`${option?.includes("cursor") && "cursor-pointer"} ${
          option?.includes("hover") &&
          "hover:scale-110 transform transition-all duration-5 00"
        }}`}
      />
    );
  };
  return { getIcon };
};
export default useIcon;
