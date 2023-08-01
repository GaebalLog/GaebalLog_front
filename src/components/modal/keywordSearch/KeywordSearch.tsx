import React from "react";

import useColor from "@/hooks/hook-color";

import Modal from "../Modal";

const KeywordSearch = () => {
  const { bgColorClass } = useColor({ bgColor: "white" });

  return (
    <Modal isOpacity>
      <div className={`w-[1330px] h-[700px] bg-[${bgColorClass}]`}>
        Add my keywords
      </div>
    </Modal>
  );
};

export default KeywordSearch;
