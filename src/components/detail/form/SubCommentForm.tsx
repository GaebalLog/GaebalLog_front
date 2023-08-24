import React from "react";
import { useSetRecoilState } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import { activatedModalIdAtom } from "@/hooks/useModalController";

import ArrowInNestedComment from "../icons/ArrowInNestedComment";

const style = {
  wrapper: `mt-8`,
  textarea: `w-full h-[130px] p-6 border border-[#DCDCDC] ${BG_COLOR.general02}`,
  buttonBox: `flex justify-end gap-1 mt-4 self-end`,
};

const SubCommentForm: React.FC<{ parentComment?: boolean }> = ({
  parentComment,
}) => {
  const setActivCommentId = useSetRecoilState(activatedModalIdAtom);

  return (
    <form className="mt-8 mb-5">
      <div className="flex">
        <ArrowInNestedComment
          className={`${parentComment ? "ml-14" : "ml-32"} mr-[22.6px]`}
        />
        <textarea
          className={style.textarea}
          placeholder="댓글을 입력해주세요."
        />
      </div>
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
