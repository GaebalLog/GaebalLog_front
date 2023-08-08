import React from "react";

import { BG_COLOR } from "@/constants/global/colors";

import Button from "../../designSystem/Button";

const styles = {
  form: `flex flex-col self-start`,
  label: `text-2xl font-bold`,
  textarea: `w-full h-[300px] mt-5 p-6 border border-[#DCDCDC] ${BG_COLOR.general02}`,
  submitButton: `mt-4 self-end`,
};

const CommentForm: React.FC<{ count: number }> = ({ count }) => {
  return (
    <form className={styles.form}>
      <label htmlFor="comment" className={styles.label}>
        {`댓글 (${count})`}
      </label>
      <textarea
        id="comment"
        className={styles.textarea}
        placeholder="댓글을 입력해주세요."
      />
      <div className={styles.submitButton}>
        <Button size="commentCreate" color="black">
          작성완료
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
