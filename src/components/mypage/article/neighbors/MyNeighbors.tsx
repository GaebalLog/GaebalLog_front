import React from "react";

import DropDown from "../../elements/DropDown";

import NeighborCard from "./elements/NeighborCard";

const neighborsTypeList = [
  "내가 추가한 이웃",
  "나를 추가한 이웃",
  "서로 이웃",
  "차단한 이웃",
];

const MyNeighborList = () => {
  const [dropDownType, setDropDownType] = React.useState("내가 추가한 이웃");

  const render = () => {
    switch (dropDownType) {
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
    <div className={`relative px-[44px] pb-[24px] w-full h-full overflow-auto`}>
      <DropDown
        tab="myNeighbors"
        dropDownType={dropDownType}
        setDropDownType={setDropDownType}
        types={neighborsTypeList}
      />
      <article className="flex flex-col gap-[16px]">{renderedList}</article>
    </div>
  );
};

export const MyNeighbors = React.memo(MyNeighborList);
