"use client";
import React from "react";
import { useRouter } from "next/navigation";

import useModalController from "@/hooks/useModalController";

import ConfirmModal from "../common/ConfirmModal";

const RequireLoginConfirm = () => {
  const { modal, closeModal } = useModalController();
  const router = useRouter();
  return (
    <>
      {modal.requiredLogin && (
        <ConfirmModal
          title="로그인이 필요한 서비스입니다."
          content="로그인 페이지로 이동하시겠습니까?"
          onNegativeClick={() => {
            closeModal("requiredLogin");
          }}
          onPositiveClick={() => {
            router.push("/auth/login");
          }}
        />
      )}
    </>
  );
};

export default RequireLoginConfirm;
