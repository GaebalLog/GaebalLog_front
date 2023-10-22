import React from "react";

import Button from "@/components/designSystem/Button";
import { TEXT_COLOR } from "@/constants/global/colors";
import { authAPI } from "@/api/authAPI";
import ConfirmModal from "@/components/modal/common/ConfirmModal";
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
