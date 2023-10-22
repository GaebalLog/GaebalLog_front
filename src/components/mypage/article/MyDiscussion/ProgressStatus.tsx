import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";

const styles = {
  isDoneCircle: `absolute top-4 right-6 rounded-2xl py-1 ${TEXT_COLOR.inverse}`,
  end: `px-4 bg-[#03A727] border-[#096B13]`,
  before: `px-[10px] bg-[#DC1E1E] border-[#891515]`,
  Proceeding: `px-[10px] bg-[#FFA800] border-[#B86E00]`,
};

const ProgressStatus: React.FC<{ status: "end" | "before" | string }> = ({
  status,
}) => {
  return (
    <div
      className={`${styles.isDoneCircle} ${
        status === "end"
          ? styles.end
          : status === "before"
          ? styles.before
          : styles.Proceeding
      }`}
    >
      {status === "end" ? "완료" : status === "before" ? "시작 전" : "진행 중"}
    </div>
  );
};

export default ProgressStatus;
