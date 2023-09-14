import React from "react";
import { useSetRecoilState } from "recoil";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import { openCommentEditorAtom } from "@/constants/global/atoms";
import useInput from "@/hooks/useInput";

import ArrowInNestedComment from "../icons/ArrowInNestedComment";
import CreateCommentBtn from "../comment/CreateCommentBtn";

const style = {
  wrapper: `mt-8`,
  textarea: `w-full h-[130px] p-6 ${BG_COLOR.general02} ${BORDER_COLOR.container}`,
  buttonBox: `flex justify-end gap-1 mt-4 self-end`,
};
interface props {
  postId: number;
  parentId: number | null;
  parentComment?: boolean;
}
const SubCommentForm: React.FC<props> = ({
  parentComment,
  postId,
  parentId,
}) => {
  const setSelectedCommentId = useSetRecoilState(openCommentEditorAtom);
  const { value, onChange } = useInput();
  return (
    <div className="mt-8 mb-5">
      <div className="flex">
        <ArrowInNestedComment
          className={`${parentComment ? "ml-14" : "ml-32"} mr-[22.6px]`}
        />
        <textarea
          className={style.textarea}
          placeholder="댓글을 입력해주세요."
          value={value}
          onChange={onChange}
        />
      </div>
      <div className={style.buttonBox}>
        <Button
          size="tab"
          color="black"
          onClick={() => setSelectedCommentId(null)}
        >
          취소
        </Button>
        <CreateCommentBtn
          postId={postId}
          parentId={parentId}
          content={value as string}
        />
      </div>
    </div>
  );
};

export default SubCommentForm;
