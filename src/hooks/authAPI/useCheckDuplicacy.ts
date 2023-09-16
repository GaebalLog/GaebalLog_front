import React from "react";

import { authAPI } from "@/api/authAPI";

const useCheckDuplicacy = (emailValue: string, nicknameValue: string) => {
  const [isEmailDuplicated, setIsEmailDuplicated] = React.useState<
    boolean | null
  >(null);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = React.useState<
    boolean | null
  >(null);
  const [isNicknameEmpty, setIsNicknameEmpty] = React.useState(false);

  const emailCheckHandler = React.useCallback(async () => {
    if (!emailValue) return;
    try {
      await authAPI.emailConfirm(emailValue);
      setIsEmailDuplicated(false);
    } catch (error) {
      if ((error as error)?.response?.status === 500) {
        setIsEmailDuplicated(true);
      } else alert("서버 연결 실패");
    }
  }, [emailValue]);
  const nicknameCheckHandler = React.useCallback(async () => {
    if (nicknameValue === "") return setIsNicknameEmpty(true);
    try {
      await authAPI.nicknameConfirm(nicknameValue);
      setIsNicknameDuplicated(false);
    } catch (error) {
      if ((error as error)?.response?.status === 500) {
        setIsNicknameDuplicated(true);
      } else alert("서버 연결 실패");
    }
  }, [nicknameValue]);

  return {
    isEmailDuplicated,
    isNicknameDuplicated,
    setIsEmailDuplicated,
    isNicknameEmpty,
    setIsNicknameDuplicated,
    emailCheckHandler,
    nicknameCheckHandler,
  };
};

export default useCheckDuplicacy;
