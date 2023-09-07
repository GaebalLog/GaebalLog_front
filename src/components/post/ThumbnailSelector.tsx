import type { ChangeEvent } from "react";
import React from "react";

import useModalController from "@/hooks/useModalController";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

import Modal from "../modal/Modal";
import Button from "../designSystem/Button";

const styles = {
  modalContainer: `w-[1472px] h-[683px] px-[56px] py-[56px] ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
  settingModalWrapper: `flex items-start gap-[80px] h-[400px] py-[30px] gap-[30px] overflow-auto`,
};

interface props {
  img: string[];
  thumbnail: string | null;
  setThumbnail: (thumbnail: string) => void;
  handleSubmit: () => void;
}

const ThumbnailSelector: React.FC<props> = ({
  img,
  thumbnail,
  setThumbnail,
  handleSubmit,
}) => {
  const [addedImg, setAddedImg] = React.useState<string[]>([]);
  const { modal, toggleModal } = useModalController();
  const { getIcon } = useIcon();
  const plus = getIcon("plus", 100, 100, "cursor hover");
  const close = getIcon("close", 24, 24, "cursor hover");
  const noneCheck = getIcon("none_check", 24, 24, "cursor hover");
  const doneCheck = getIcon("done_check", 24, 24, "cursor hover");
  const thumbnailList = [...addedImg, ...img].reduce<string[]>((acc, value) => {
    if (!acc.includes(value)) acc.push(value);
    return acc;
  }, []);
  const checkedThumbnail = () => {
    if (thumbnail) return handleSubmit();
    else return alert("썸네일을 선택해주세요");
  };
  const onChangeImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgSrc = e.target.files && e.target.files[0];
    if (!imgSrc) return;
    const reader = new FileReader();
    reader.readAsDataURL(imgSrc);
    reader.onloadend = () => {
      if (!reader.result) return;
      const img = `<img src="${reader.result as string}">`;
      setAddedImg((prev) => [img, ...prev]);
    };
  };

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      {modal.thumbnailSelectModal && (
        <Modal
          onBackdropClick={() => toggleModal("thumbnailSelectModal")}
          isBgColor
          blockScroll
          isFixed
        >
          <div
            className="absolute top-[24px] right-[24px]"
            onClick={() => toggleModal("thumbnailSelectModal")}
          >
            {close}
          </div>
          <div className={styles.modalContainer}>
            <p className="text-[24px] font-bold mb-[24px]">대표이미지 설정</p>
            <p>권장 해상도(가로 : 280px, 세로 : 280px)</p>
            <ul className={styles.settingModalWrapper}>
              <div className="h-full relative flex items-start">
                <label htmlFor="profileImg">
                  <div
                    className={`flex flex-col justify-center items-center gap-[24px] w-[280px] h-[280px] ${BG_COLOR.general04}`}
                  >
                    {plus}
                    <span>대표이미지 추가</span>
                  </div>
                </label>
                <div className="absolute w-[120px] h-full -z-10 top-0 left-0 overflow-hidden opacity-0">
                  <input
                    id="profileImg"
                    type="file"
                    onChange={onChangeImgHandler}
                  />
                </div>
              </div>
              {thumbnailList?.map((imgSrc, idx) => (
                <li
                  key={`썸네일 ${idx}`}
                  onClick={() => setThumbnail(imgSrc)}
                  className="flex flex-col items-center relative gap-[10px] cursor-pointer"
                >
                  <div
                    className={`thumbnail-box ${
                      thumbnail === imgSrc
                        ? BORDER_COLOR.purple
                        : BORDER_COLOR.button
                    } ${BG_COLOR.general02}`}
                    dangerouslySetInnerHTML={{ __html: imgSrc }}
                  />
                  {thumbnail === imgSrc ? doneCheck : noneCheck}
                  {thumbnail === imgSrc && (
                    <div
                      className={`absolute top-0 left-0 p-[10px] ${BG_COLOR.accentPurple} text-white`}
                    >
                      대표이미지
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center">
              <Button
                size="commentCreate"
                color="white"
                border
                onClick={checkedThumbnail}
                className="mt-[30px]"
              >
                설정 완료
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ThumbnailSelector;
