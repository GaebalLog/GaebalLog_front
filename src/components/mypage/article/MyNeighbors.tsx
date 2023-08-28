import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";
import useIcon from "@/hooks/useIcon";

import AddByMe from "./neighbors/AddedByMe";
import AddByYou from "./neighbors/AddedByYou";
import BannedByMe from "./neighbors/BannedByMe";

const neighborsTypeList = [
  "내가 추가한 이웃",
  "나를 추가한 이웃",
  "차단한 이웃",
] as const;

const styles = {
  dropDown: {
    container: `flex relative w-[200px] h-[48px] rounded-[3px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.general06} ${BG_COLOR.primary}`,
    drop: "w-[200px] h-[48px] cursor-pointer flex items-center justify-center text-[20px] gap-[10px]",
    ul: `absolute top-[48px] left-0 z-10 w-[200px] max-h-[170px] overflow-y-auto rounded-[10px] text-[20px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.primary}`,
    noSelected: `w-full h-[48px] px-[30px] flex items-center cursor-pointer ${BG_COLOR.general01}`,
    selected: `w-full h-[48px] px-[30px] flex items-center cursor-pointer ${BG_COLOR.general06}`,
  },
};

const MyNeighborList = () => {
  const { modal, closeModal, toggleModal } = useModalController();
  const { getIcon } = useIcon();
  const downBtn = getIcon("downBtn", 8, 12, "cursor hover");

  const [neighborType, setNeighborType] =
    React.useState<(typeof neighborsTypeList)[number]>("내가 추가한 이웃");
  const [hoveredItem, setHoveredItem] =
    React.useState<(typeof neighborsTypeList)[number]>();

  const render = () => {
    switch (neighborType) {
      case "내가 추가한 이웃":
        return <AddByMe />;
      case "나를 추가한 이웃":
        return <AddByYou />;
      case "차단한 이웃":
        return <BannedByMe />;
    }
  };
  const renderedList = render();
  return (
    <div className={`px-[54px] py-[40px] w-full h-full overflow-auto`}>
      <div
        className={styles.dropDown.container}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={styles.dropDown.drop}
          onClick={() => toggleModal("myNeightborsType")}
        >
          {neighborType}
          {downBtn}
        </span>
        {modal.myNeightborsType && (
          <ul className={styles.dropDown.ul}>
            {neighborsTypeList.map((type) => (
              <li
                key={type}
                className={
                  hoveredItem === type
                    ? styles.dropDown.selected
                    : styles.dropDown.noSelected
                }
                onClick={() => {
                  setNeighborType(type);
                  closeModal("myNeightborsType");
                }}
                onMouseOver={() => setHoveredItem(type)}
                onMouseLeave={() => setHoveredItem(undefined)}
              >
                {type}
              </li>
            ))}
          </ul>
        )}
      </div>
      <article className="flex flex-col gap-[16px] mt-[40px]">
        {renderedList}
      </article>
    </div>
  );
};

export const MyNeighbors = React.memo(MyNeighborList);
