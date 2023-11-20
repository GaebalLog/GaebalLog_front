import React from "react";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/hooks/useUserAuth";
import { TEXT_COLOR } from "@/config/constants/colors";

interface props {
  dropDownType:
    | "내가 쓴 글"
    | "임시저장 글"
    | "내가 북마크한 글"
    | "내가 댓글 단 글"
    | "내가 좋아요 한 글";
}

const NoData: React.FC<props> = ({ dropDownType }) => {
  const { nickname } = useRecoilValue(userAtom);

  const render = () => {
    switch (dropDownType) {
      case "내가 쓴 글":
        return `${nickname} 님이 쓴 글 이 없습니다.`;
      case "임시저장 글":
        return `임시저장 한 글 이 없습니다.`;
      case "내가 북마크한 글":
        return `추가된 글 이 없습니다.`;
      case "내가 댓글 단 글":
        return `${nickname} 님이 댓글 단 글이 없습니다.`;
      case "내가 좋아요 한 글":
        return `${nickname} 님이 좋아요 한 글이 없습니다.`;
      default:
        return;
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-full h-full ${TEXT_COLOR.general08}`}
    >
      {render()}
    </div>
  );
};

export default NoData;
