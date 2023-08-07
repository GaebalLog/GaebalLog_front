import React from "react";
import { useSetRecoilState } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { activeCommentIdAtom } from "@/constants/global/atoms";
import Button from "@/components/designSystem/Button";

const style = {
  wrapper: `mt-8`,
  textarea: `w-full h-[130px] p-6 border border-[#DCDCDC] ${BG_COLOR.general02}`,
  buttonBox: `flex justify-end gap-1 mt-4 self-end`,
};

const SubCommentForm: React.FC = () => {
  const setActivCommentId = useSetRecoilState(activeCommentIdAtom);

  return (
    <form className="mt-8 mb-5">
      <textarea className={style.textarea} placeholder="댓글을 입력해주세요." />
      <div className={style.buttonBox}>
        <Button
          size="tab"
          color="black"
          onClick={() => setActivCommentId(null)}
        >
          취소
        </Button>
        <Button size="tab" color="black">
          작성완료
        </Button>
      </div>
    </form>
  );
};

export default SubCommentForm;
