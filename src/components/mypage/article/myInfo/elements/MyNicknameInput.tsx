import React from "react";
import { useRecoilValue } from "recoil";

import { BORDER_COLOR, TEXT_COLOR } from "@/config/constants/colors";
import { userAtom } from "@/hooks/useUserAuth";
import useInput from "@/hooks/useInput";
import Button from "@/components/designSystem/Button";
import useUpdateNickname from "@/hooks/mypageAPI/useUpdateNickname";

const MyNicknameInput = () => {
  const { nickname } = useRecoilValue(userAtom);

  const nicknameInput = useInput();
  const { handleUpdateNickname } = useUpdateNickname(nicknameInput);

  return (
    <div className="flex flex-col gap-[14px]">
      <h1 className={`${TEXT_COLOR.primary} text-[24px] font-bold`}>닉네임</h1>
      <div className={`flex ${TEXT_COLOR.primary}`}>
        <input
          data-testid="nicknameInput"
          placeholder={nickname ?? ""}
          className={`w-[200px] bg-inherit py-[12px] ${BORDER_COLOR.containerBottom}`}
          {...nicknameInput}
        />
        <Button
          size="button"
          color="white"
          border
          onClick={handleUpdateNickname}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default MyNicknameInput;
