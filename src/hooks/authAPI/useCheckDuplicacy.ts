import React from "react";

import { authAPI } from "@/api/authAPI";
import { utilErrorCase } from "@/utils/util-errorCase";

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
      utilErrorCase((error as error).response.status);
    }
  }, [emailValue]);

  const nicknameCheckHandler = React.useCallback(async () => {
    if (nicknameValue === "") return setIsNicknameEmpty(true);
    try {
      await authAPI.nicknameConfirm(nicknameValue);
      setIsNicknameDuplicated(false);
    } catch (error) {
      utilErrorCase((error as error).response.status);
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
