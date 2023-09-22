import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";
import useIcon from "@/hooks/useIcon";

const styles = {
  dropDown: {
    container: `flex relative w-[200px] h-[48px] rounded-[3px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.general06} ${BG_COLOR.primary}`,
    drop: "w-full h-[48px] cursor-pointer flex items-center justify-center text-[20px] gap-[10px]",
    ul: `absolute top-[46px] left-0 w-full max-h-[170px] text-[20px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.primary}`,
    li: `w-full h-[48px] flex items-center justify-center cursor-pointer`,
  },
};

interface DropDownProps<T extends string> {
  tab: "myNeighbors" | "mydiscussions";
  types: T[];
  dropDownType: T;
  setDropDownType: React.Dispatch<React.SetStateAction<T>>;
}

const DropDown = <T extends string>({
  tab,
  types,
  dropDownType,
  setDropDownType,
}: DropDownProps<T>) => {
  const [hoveredItem, setHoveredItem] = React.useState("");

  const { getIcon } = useIcon();
  const downBtn = getIcon("downBtn", 8, 12, "cursor hover");
  const { modal, closeModal, toggleModal } = useModalController();

  const paddingBottom = tab === "myNeighbors" ? "pb-[28px]" : "pb-[16px]";

  return (
    <div
      className={`sticky top-[0] z-10 pt-[24px] ${paddingBottom} ${BG_COLOR.general02}`}
    >
      <div
        className={styles.dropDown.container}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          data-testid="neighborDropDown"
          className={styles.dropDown.drop}
          onClick={() => toggleModal("myPageDropDownType")}
        >
          {dropDownType}
          {downBtn}
        </span>
        {modal.myPageDropDownType && (
          <ul className={styles.dropDown.ul}>
            {types.map((type) => (
              <li
                key={type}
                className={`${styles.dropDown.li} ${
                  hoveredItem === type ? BG_COLOR.general06 : BG_COLOR.general01
                }`}
                onClick={() => {
                  setDropDownType(type);
                  closeModal("myPageDropDownType");
                }}
                onMouseOver={() => setHoveredItem(type)}
                onMouseLeave={() => setHoveredItem("")}
              >
                {type}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
