"use client";

import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Button from "@/components/designSystem/Button";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import AddTagInput from "@/components/post/AddTagInput";
import withAuth from "@/components/provider/withAuth";
import type { postDataType } from "@/api/postAPI";
import { postAPI } from "@/api/postAPI";
import { utilExtractImages } from "@/utils/util-extractImage";
import { utilReplaceImg } from "@/utils/util-replaceImg";
import ThumbnailSelector from "@/components/post/ThumbnailSelector";
import useModalController from "@/hooks/useModalController";
const PostEditor = dynamic(() => import("@/components/post/PostEditor"), {
  ssr: false,
});
const TimeSetting = dynamic(
  () => import("../../../components/post/discussionTimeSetting/TimeSetting"),
);

const styles = {
  wrapper: `relative w-full h-[calc(100vh-94px)] flex justify-center`,
  form: `flex flex-col`,
  titleBox: {
    wrapper: `flex items-center mt-5 mb-[31px]`,
    title: `w-[1102px] px-1 py-[26px] mr-[30px] text-xl focus:outline-none ${BG_COLOR.background} ${BORDER_COLOR.containerBottom} dark:placeholder:text-[#888888]`,
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

const Postpage: React.ComponentType = withAuth(() => {
  const [article, setArticle] = React.useState<string>("");
  const [data, setData] = React.useState<postDataType>({
    title: "",
    content: "",
    img: [],
    thumbnail: null,
    categories: [],
  });
  const [timeSetting, setTimeSetting] = React.useState({
    startTime: "",
    endTime: "",
  });

  const router = useRouter();
  const { openModal } = useModalController();

  React.useEffect(() => {
    setData((prev) => ({ ...prev, content: utilReplaceImg(article) }));
    setData((prev) => ({ ...prev, img: utilExtractImages(article) }));
  }, [article]);

  const handleSubmit = async () => {
    const feedData = data.thumbnail
      ? data
      : { ...data, thumbnail: data.img[0] };
    const result = await postAPI.create(feedData);
    if (result.status === 201) {
      router.push(`/tech/${result.data.id}`);
      return alert("성공적으로 작성되었습니다.");
    }
    console.log(timeSetting);
  };
  const confirmThumbnail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    return openModal("thumbnailSelectModal");
  };

  const titleChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, title: value }));
  };

  const contentHandler = (origin: string) => {
    setArticle(origin);
  };

  const categoryHandler = (categories: string[]) => {
    setData((prev) => ({ ...prev, categories }));
  };

  const setThumbnail = (thumbnail: string) => {
    setData((prev) => ({ ...prev, thumbnail }));
  };

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
          <TimeSetting setTimeSetting={setTimeSetting} />
        </div>
        <PostEditor content={article} editHandler={contentHandler} />
        <ThumbnailSelector
          img={data.img}
          thumbnail={data.thumbnail}
          setThumbnail={setThumbnail}
          handleSubmit={handleSubmit}
        />
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
              onClick={confirmThumbnail}
            >
              작성 완료
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Postpage;
