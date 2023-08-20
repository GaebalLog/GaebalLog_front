import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import NonPortalModal from "@/components/modal/NonPortalModal";
import Button from "@/components/designSystem/Button";
import { activeModalIdAtom } from "@/hooks/useModalController";

import ChatTail from "./ChatTail";

const styles = {
  wrapper: `w-[375px] h-[124px] py-5 px-[18px] mb-[60px] relative`,
  commentWrapper: `relative z-10`,
  metaInfoBox: `flex items-center gap-[10px] mb-6`,
  profileButton: `relative w-10 h-10`,
};

const ChatItem: React.FC<chat> = ({
  chatId,
  userId,
  nickname,
  profileImage,
  content,
}) => {
  const [activeChatId, setActiveChatId] = useRecoilState(activeModalIdAtom);

  const isMe = userId === 1;
  const bgColor = isMe ? BG_COLOR.general03 : BG_COLOR.general01;

  return (
    <div className={`${styles.wrapper} ${bgColor}`}>
      <div className={styles.commentWrapper}>
        <div className={styles.metaInfoBox}>
          <button
            className={styles.profileButton}
            onClick={() => setActiveChatId(chatId)}
          >
            <Image
              className="rounded-full object-cover"
              src={profileImage}
              fill
              sizes="80px"
              alt="프사"
            />
          </button>
          <span>{nickname}</span>
          {activeChatId === chatId && (
            <NonPortalModal
              topLeft={{ top: 0, left: 45 }}
              onBackdropClick={() => setActiveChatId(null)}
            >
              <div className={`flex flex-col ${BORDER_COLOR.button}`}>
                <Button size="tab" color="white">
                  강퇴하기
                </Button>
                <Button size="tab" color="white">
                  이웃추가
                </Button>
              </div>
            </NonPortalModal>
          )}
        </div>
        <h5>{content}</h5>
      </div>
      <ChatTail isMe={isMe} bgColor={bgColor} />
    </div>
  );
};

export default ChatItem;
