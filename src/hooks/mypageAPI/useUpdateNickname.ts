import type React from "react";
import { useSetRecoilState } from "recoil";

import { mypageApi } from "@/api/mypageApi";

import { userAtom } from "../useUserAuth";

interface parameter {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const useUpdateNickname = ({ value, setValue }: parameter) => {
  const setUser = useSetRecoilState(userAtom);

  const handleUpdateNickname = async () => {
    try {
      await mypageApi.updateNickname(value + "");
      setUser((prev) => ({ ...prev, nickname: value + "" }));
      alert("닉네임 수정 성공");
      setValue("");
    } catch (error) {
      console.log("닉네임 수정 오류 ::", error);
      alert("닉네임 수정 실패");
    }
  };

  return { handleUpdateNickname };
};

export default useUpdateNickname;
