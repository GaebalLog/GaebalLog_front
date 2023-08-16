import React from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";

import { modalAtom } from "@/constants/global/atoms";
import { TEXT_COLOR } from "@/constants/global/colors";

// eslint-disable-next-line @typescript-eslint/naming-convention
const KeywordSearch = dynamic(
  () => import("../../components/modal/keywordSearch/KeywordSearch"),
);

const EditBtn: React.FC<{ position: "top" | "bottom" | "disussion" }> = ({
  position,
}) => {
  const [isModal, setIsModal] = useRecoilState<boolean>(modalAtom);

  const editPosition =
    position === "top" || position === "disussion"
      ? "top-[26px]"
      : "bottom-[16px]";

  const buttonStyles = `${TEXT_COLOR.primary} ${
    position === "bottom" ? "text-[24px]" : "text-[16px]"
  } absolute ${editPosition} right-[25px]`;
  return (
    <>
      <button
        className={buttonStyles}
        onClick={() => setIsModal((prev) => !prev)}
        onMouseOver={() =>
          import("../../components/modal/keywordSearch/KeywordSearch")
        }
      >
        + Edit
      </button>
      {isModal && <KeywordSearch />}
    </>
  );
};

export default EditBtn;
