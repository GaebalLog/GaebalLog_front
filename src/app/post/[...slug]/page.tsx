"use client";

import React from "react";
import { notFound } from "next/navigation";

import PostEditor from "@/components/post/PostEditor";
import Button from "@/components/designSystem/Button";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import NonPortalModal from "@/components/modal/NonPortalModal";

export interface postpageParams {
  params: {
    slug: string[];
  };
}

const styles = {
  wrapper: `w-full h-[calc(100vh-94px)] flex justify-center`,
  form: `flex flex-col`,
  titleBox: {
    wrapper: `flex items-center mt-5 mb-[31px]`,
    title: `w-[1102px] px-1 py-[26px] mr-[30px] text-xl border-b focus:outline-none`,
    timeSetting: `py-[10px] px-[20px] border ${BORDER_COLOR.button}`,
  },
  bottomBox: {
    wrapper: `flex justify-between items-center mt-[74px] mb-[60px]`,
    tagDiv: `relative w-[1068px]`,
    input: `w-full py-3 px-6 ${BORDER_COLOR.button} rounded-full`,
    modal: `py-4 px-6 ${BG_COLOR.general06} ${TEXT_COLOR.inverse}`,
    buttonDiv: `flex gap-[30px]`,
  },
};

const Postpage: React.FC<postpageParams> = ({ params: { slug } }) => {
  const [isModal, setIsModal] = React.useState(false);
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const editorDataRef = React.useRef("");
  console.log(editorDataRef);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (titleRef.current) {
      console.log(titleRef.current.value);
    }
  };

  React.useEffect(() => {
    if (slug[0] !== "tech" && slug[0] !== "discussion") return notFound();
  }, [slug]);

  return (
    <main className={styles.wrapper}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.titleBox.wrapper}>
          <input
            className={styles.titleBox.title}
            ref={titleRef}
            placeholder="제목을 입력해주세요."
          />
          {slug[0] === "discussion" && (
            <div>
              <label htmlFor="time">
                <select className={styles.titleBox.timeSetting} id="time">
                  <option value="">토의 시간 설정</option>
                </select>
              </label>
            </div>
          )}
        </div>
        <PostEditor />
        <div className={styles.bottomBox.wrapper}>
          <div className={styles.bottomBox.tagDiv}>
            <input
              placeholder="태그는 최대 3개까지 입력할 수 있습니다."
              onFocus={() => setIsModal(true)}
              onBlur={() => setIsModal(false)}
              className={styles.bottomBox.input}
            />
            {isModal && (
              <NonPortalModal topLeft={{ top: -70, left: 0 }} nonBackdrop>
                <div className={styles.bottomBox.modal}>
                  해쉬태그 또는 엔터를 입력하여 태그를 등록할 수 있습니다.
                </div>
              </NonPortalModal>
            )}
          </div>
          <div className={styles.bottomBox.buttonDiv}>
            <Button className="px-12" size="bigLogin" color="lightGrey">
              임시 저장
            </Button>
            <Button
              type="submit"
              className="px-12"
              size="bigLogin"
              color="black"
            >
              작성 완료
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Postpage;
