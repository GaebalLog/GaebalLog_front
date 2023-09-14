import React from "react";

interface countdownMsgProps {
  isEmailSent: boolean;
  resendClick: number;
}

const CountdownMsg: React.FC<countdownMsgProps> = ({
  isEmailSent,
  resendClick,
}) => {
  const [countdown, setCountdown] = React.useState(300);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  React.useEffect(() => {
    if (isEmailSent && countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [isEmailSent, countdown]);

  React.useEffect(() => {
    setCountdown(300);
  }, [resendClick]);

  return (
    <p
      className={`-mt-[10px] ${!isEmailSent && "text-transparent"} select-none`}
    >
      {countdown === 0
        ? "시간이 만료되었습니다."
        : `남은 시간: ${minutes}분 ${String(seconds).padStart(2, "0")}초`}
    </p>
  );
};

export default CountdownMsg;
