import React from "react";

import Contents from "@/components/tech/detail/content/Contents";
import Button from "@/components/designSystem/Button";
import DeleteConfirm from "@/components/modal/common/DeleteConfirm";
import { utilDecodeImg } from "@/utils/util-decodeImg";
import LikeView from "@/components/commonUI/LikeView";
import UpdateBtn from "@/components/tech/updateBtn";
import useGetDetailPost from "@/hooks/postAPI/useGetDetailPost";
import useToggleLike from "@/hooks/postAPI/useToggleLike";
import useModalController from "@/hooks/useModalController";
import { BG_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";

const styles = {
  innerContainer: `flex gap-[109px] w-full min-h-[880px]`,
  inner: `w-[909px] mt-[60px]`,
  category: `mt-[210px] w-[252px] ${BG_COLOR.general02} px-[16px] py-[24px] max-h-[256px]`,
  categoryTitle: `text-[24px] font-hack`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
};
const ContentContainer = () => {
  const [detailData, setDetailData] = React.useState<postListAuthor>();
  const { modal, openModal } = useModalController();
  useGetDetailPost({ onSuccessSet: setDetailData });
  const dateConvertor = new DateConvertor(detailData?.createdAt);

  const toggleLikeHandler = () => {
    setDetailData((prev) => {
      if (!prev) return prev;
      const likedStatus = !prev.liked;
      return {
        ...prev,
        liked: likedStatus,
        like: likedStatus ? prev.like + 1 : prev.like - 1,
      };
    });
  };
  const { mutate: likeHandler } = useToggleLike({
    onToggle: toggleLikeHandler,
  });
  return (
    <div className={styles.innerContainer}>
      <aside className={styles.category}>
        <span className={styles.categoryTitle}>Main Keywords</span>
        <ul className="flex flex-col gap-[16px] mt-[24px]">
          {detailData?.categories.map((category, i) => (
            <li key={`${detailData?.postId}${category}${i}`}>
              <Button color="grey" size="tag">
                # {category}
              </Button>
            </li>
          ))}
        </ul>
      </aside>
      <article className={styles.inner}>
        <p className="text-[36px] text-center font-bold h-[80px]">
          {detailData?.title}
        </p>
        <div className="flex gap-[32px] justify-between items-center">
          <div className="flex gap-[16px] items-center">
            <span className="text-[20px]">{detailData?.nickname}</span>
            {detailData?.createdAt && (
              <span>{dateConvertor.formatWithDot()}</span>
            )}
            <div>
              <LikeView
                like={detailData?.like}
                likeHandler={() =>
                  detailData?.postId && likeHandler(detailData.postId)
                }
                liked={detailData?.liked}
                view={detailData?.view}
              />
            </div>
          </div>
          {detailData?.isAuthor && (
            <div className="flex gap-[16px]">
              <UpdateBtn postId={detailData?.postId} />
              <Button
                size="tab"
                color="white"
                border
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("deleteModal");
                }}
              >
                글 삭제
              </Button>
            </div>
          )}
        </div>
        {modal.deleteModal && (
          <DeleteConfirm mode="tech" postId={detailData?.postId as number} />
        )}
        <hr className={styles.line} />
        {detailData && (
          <Contents
            contents={utilDecodeImg(detailData?.content, detailData?.img)}
          />
        )}
      </article>
    </div>
  );
};

export default ContentContainer;
