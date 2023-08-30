"use client";

import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import PostEditor from "@/components/post/PostEditor";
import Button from "@/components/designSystem/Button";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import AddTagInput from "@/components/post/AddTagInput";
import withAuth from "@/components/provider/withAuth";
import type { postDataType } from "@/api/postAPI";
import { postAPI } from "@/api/postAPI";

const TimeSetting = dynamic(
  () => import("../../../components/post/TimeSetting"),
);

const styles = {
  wrapper: `w-full h-[calc(100vh-94px)] flex justify-center`,
  form: `flex flex-col`,
  titleBox: {
    wrapper: `flex items-center mt-5 mb-[31px]`,
    title: `w-[1102px] px-1 py-[26px] mr-[30px] text-xl border-b focus:outline-none`,
    timeSetting: `flex items-center gap-[11px] py-[9px] px-[19px] border ${BORDER_COLOR.button}`,
  },
  bottomBox: {
    wrapper: `flex justify-between items-center mt-[74px] mb-[60px]`,
    tagDiv: `relative w-[1068px]`,
    input: `w-full py-3 px-6 ${BORDER_COLOR.button} rounded-full`,
    modal: `py-4 px-6 ${BG_COLOR.general06} ${TEXT_COLOR.inverse}`,
    buttonDiv: `flex gap-[30px]`,
  },
};

export interface postpageParams {
  params: {
    type: string[];
  };
}

const UpdatePage: React.ComponentType<postpageParams> = withAuth(
  ({ params: { type } }) => {
    const [data, setData] = React.useState<postDataType>({
      title: "",
      content: "",
      categories: [],
    });

    const handleSubmit = async () => {
      const result = await postAPI.create(data);
      console.log(result);
    };

    const titleChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setData((prev) => ({ ...prev, title: value }));
    };

    const contentHandler = (content: string) => {
      setData((prev) => ({ ...prev, content }));
    };

    const categoryHandler = (categories: string[]) => {
      setData((prev) => ({ ...prev, categories }));
    };

    React.useEffect(() => {
      if (type[0] !== "tech" && type[0] !== "discussion") return notFound();
    }, [type]);

    return (
      <main className={styles.wrapper}>
        <div className={styles.form}>
          <div className={styles.titleBox.wrapper}>
            <input
              className={styles.titleBox.title}
              value={data.title}
              onChange={titleChangeHanlder}
              placeholder="제목을 입력해주세요."
            />
            {type[0] === "discussion" && <TimeSetting />}
          </div>
          <PostEditor content={data.content} editHandler={contentHandler} />
          <div className={styles.bottomBox.wrapper}>
            <AddTagInput
              categories={data.categories}
              setCategories={categoryHandler}
            />
            <div className={styles.bottomBox.buttonDiv}>
              <Button className="px-12" size="bigLogin" color="lightGrey">
                임시 저장
              </Button>
              <Button
                type="submit"
                className="px-12"
                size="bigLogin"
                color="black"
                onClick={handleSubmit}
              >
                작성 완료
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  },
);

export default UpdatePage;
