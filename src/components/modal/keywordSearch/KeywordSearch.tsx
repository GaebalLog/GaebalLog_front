import React from "react";

import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";

import Modal from "../Modal";

const KeywordSearch = () => {
  return (
    <Modal background>
      <div
        className={`flex flex-col items-center w-[1330px] h-[700px] ${BG_COLOR.general02}}`}
      >
        <span>Add my keywords</span>
      </div>
    </Modal>
  );
};

export default KeywordSearch;
