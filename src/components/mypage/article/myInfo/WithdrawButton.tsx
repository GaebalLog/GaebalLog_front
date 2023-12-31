import React from "react";

import Button from "@/components/UI/buttons/base/Button";
import { TEXT_COLOR } from "@/config/constants/colors";
import { authAPI } from "@/config/api/authAPI";
import ConfirmModal from "@/components/UI/modals/default/ConfirmModal";
import useUserAuth from "@/hooks/useUserAuth";

const WithdrawButton = () => {
  const [modal, openModal] = React.useState(false);
  const { logout } = useUserAuth();
  const withdraw = async () => {
    try {
      await authAPI.withdraw();
      alert("회원탈퇴되었습니다.");
      logout();
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };
  return (
    <div>
      <h1 className={`${TEXT_COLOR.general07rev} mb-[10px]`}>
        *회원 탈퇴 ( 회원 탈퇴 시 모든 데이터는 삭제되어 복구 되지 않습니다.)
      </h1>
      <Button
        size="button"
        color="white"
        border
        onClick={() => openModal(true)}
      >
        회원탈퇴
      </Button>
      {modal && (
        <ConfirmModal
          title={`정말 탈퇴하시겠습니까?`}
          onlyTitle
          content={<></>}
          onNegativeClick={() => openModal(false)}
          onPositiveClick={withdraw}
        />
      )}
    </div>
  );
};

export default WithdrawButton;
