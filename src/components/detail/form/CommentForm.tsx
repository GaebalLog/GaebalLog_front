import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";

import Button from "../../designSystem/Button";

const styles = {
  form: `flex flex-col self-start`,
  label: `text-2xl font-bold`,
  textarea: `w-full h-[300px] mt-5 p-6 border border-[#DCDCDC] ${BG_COLOR.general02}`,
  submitButton: `mt-4 self-end`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  blank: `mt-[63px] mb-8`,
};

const CommentForm: React.FC<{ count: number }> = ({ count }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <form className={styles.form}>
      <label htmlFor="comment" className={styles.label}>
        {`댓글 (${count})`}
      </label>
      {isLoggedIn ? (
        <>
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
          <hr className={styles.line} />
        </>
      ) : (
        <div className={styles.blank} />
      )}
    </form>
  );
};

export default CommentForm;
