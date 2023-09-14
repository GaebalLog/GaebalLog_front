import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/hooks/useUserAuth";
import useInput from "@/hooks/useInput";

import CreateCommentBtn from "../btn/CreateCommentBtn";

const styles = {
  form: `flex flex-col self-start`,
  label: `text-2xl font-bold`,
  textarea: `w-full h-[300px] mt-5 p-6 ${BG_COLOR.general02} ${BORDER_COLOR.container}`,
  submitButton: `mt-4 self-end`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  blank: `mt-[63px] mb-8`,
};
interface props {
  count: number | undefined;
}
const CommentForm: React.FC<props> = ({ count }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const { value, onChange } = useInput();
  return (
    <div className={styles.form}>
      <label htmlFor="comment" className={styles.label}>
        {`댓글 (${count})`}
      </label>
      {isLoggedIn ? (
        <>
          <textarea
            id="comment"
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder="댓글을 입력해주세요."
          />
          <CreateCommentBtn content={value as string} />
          <hr className={styles.line} />
        </>
      ) : (
        <div className={styles.blank} />
      )}
    </div>
  );
};

export default CommentForm;
