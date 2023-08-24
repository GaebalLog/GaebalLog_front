import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import NonPortalModal from "@/components/modal/NonPortalModal";
import Button from "@/components/designSystem/Button";
import { activatedModalIdAtom } from "@/hooks/useModalController";
import ProfileImage from "@/components/designSystem/ProfileImage";

import ChatTail from "./ChatTail";

const styles = {
  wrapper: `w-[375px] h-[124px] py-5 px-[18px] mb-[60px] relative`,
  commentWrapper: `relative z-10`,
  metaInfoBox: `flex items-center gap-[10px] mb-6`,
};

const profileModal = ["이웃추가", "차단하기", "강퇴하기"];

const ChatItem: React.FC<chat> = ({
  chatId,
  userId,
  nickname,
  profileImage,
  content,
}) => {
  const activatedId = useRecoilValue(activatedModalIdAtom);

  const isMe = userId === 1;
  const bgColor = isMe ? BG_COLOR.general03 : BG_COLOR.general01;

  return (
    <div className={`${styles.wrapper} ${bgColor}`}>
      <div className={styles.commentWrapper}>
        <div
          className={styles.metaInfoBox}
          onClick={(e) => e.stopPropagation()}
        >
          <ProfileImage idForModal={chatId} profileImage={profileImage} />
          <span>{nickname}</span>
          {activatedId === chatId && (
            <NonPortalModal topLeft={{ top: 0, left: 45 }} nonBackdrop>
              <div className={`flex flex-col ${BORDER_COLOR.button}`}>
                {profileModal.map((text, i) => (
                  <Button
                    key={i}
                    className={`py-4 px-[30px]`}
                    size="tab"
                    color="white"
                  >
                    {text}
                  </Button>
                ))}
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
