import React from "react";

const styles = {
  roundedStick: `absolute transform w-[8px] h-[80px] rounded-lg `,
  triangle: `absolute top-0 left-0 w-[60px] h-[80px] `,
};

interface ChatTailProps {
  isMe: boolean;
  bgColor: string;
}

const ChatTail: React.FC<ChatTailProps> = ({ isMe, bgColor }) => {
  const isMyChat = isMe
    ? `-top-5 right-2 rotate-[85deg]`
    : `top-0.5 -left-1 rotate-[315deg]`;
  return (
    <div className={`${styles.roundedStick} ${isMyChat} ${bgColor}`}>
      <div
        className={`${styles.triangle} ${bgColor}`}
        style={{
          clipPath: "polygon(10.5% 0%, 10% 100%, 90% 80%)",
        }}
      />
    </div>
  );
};

export default ChatTail;
