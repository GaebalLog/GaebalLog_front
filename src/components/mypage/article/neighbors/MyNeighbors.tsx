import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";
import useIcon from "@/hooks/useIcon";

import NeighborCard from "./elements/NeighborCard";

const neighborsTypeList = [
  "내가 추가한 이웃",
  "나를 추가한 이웃",
  "서로 이웃",
  "차단한 이웃",
] as const;

const styles = {
  dropDown: {
    container: `flex relative w-[200px] h-[48px] rounded-[3px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.general06} ${BG_COLOR.primary}`,
    drop: "w-full h-[48px] cursor-pointer flex items-center justify-center text-[20px] gap-[10px]",
    ul: `absolute top-[46px] left-0 w-full max-h-[170px] text-[20px] border border-solid ${BORDER_COLOR.container} ${TEXT_COLOR.primary}`,
    li: `w-full h-[48px] flex items-center justify-center cursor-pointer`,
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
        return <NeighborCard type="addedByMe" />;
      case "나를 추가한 이웃":
        return <NeighborCard type="addedByYou" />;
      case "서로 이웃":
        return <NeighborCard type="addedByBoth" />;
      case "차단한 이웃":
        return <NeighborCard type="bannedByMe" />;
    }
  };
  const renderedList = render();
  return (
    <div className={`relative px-[54px] pb-[40px] w-full h-full overflow-auto`}>
      <div
        className={`sticky top-0 z-10 pt-[40px] pb-[20px] ${BG_COLOR.general02}`}
      >
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
                  className={`${styles.dropDown.li} ${
                    hoveredItem === type
                      ? BG_COLOR.general06
                      : BG_COLOR.general01
                  }`}
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
      </div>
      <article className="flex flex-col gap-[16px]">{renderedList}</article>
    </div>
  );
};

export const MyNeighbors = React.memo(MyNeighborList);
