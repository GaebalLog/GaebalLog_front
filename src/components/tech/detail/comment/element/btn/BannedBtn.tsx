import React from "react";

import ConfirmModal from "@/components/modal/common/ConfirmModal";
import { mypageApi } from "@/api/mypageApi";

interface props {
  nickname: string;
  userId: string;
}

const BannedBtn: React.FC<props> = ({ nickname, userId }) => {
  const [modal, openModal] = React.useState(false);

  const onBlockClick = () => {
    modal ? openModal(false) : openModal(true);
  };

  const addBlockUser = async () => {
    await mypageApi.addBlockUser(userId);
    openModal(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button className="ml-10" onClick={onBlockClick}>
        차단하기
      </button>
      {modal && (
        <ConfirmModal
          title={`${nickname} 님을 정말 차단하겠습니까?`}
          content={
            <>
              <p>이 사람이 작성한 댓글은 모두 숨겨지고</p>
              <p>이후 내 글에 댓글을 쓰거나 나와의 토의를 할 수 없게 됩니다.</p>
            </>
          }
          onNegativeClick={() => {
            onBlockClick();
          }}
          onPositiveClick={() => {
            addBlockUser();
          }}
        />
      )}
    </div>
  );
};

export default BannedBtn;
