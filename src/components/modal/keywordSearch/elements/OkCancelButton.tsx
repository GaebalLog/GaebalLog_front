import React from "react";
import { useSetRecoilState } from "recoil";

import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/config/constants/atoms";

const OkCancelButton = () => {
  const setIsModal = useSetRecoilState(modalAtom);
  return (
    <div className="self-end mt-[57px]">
      <Button
        className="mr-6"
        size="confirm"
        color="black"
        onClick={() => setIsModal((prev) => !prev)}
      >
        Ok
      </Button>
      <Button
        size="confirm"
        color="cancelButton"
        border
        onClick={() => setIsModal((prev) => !prev)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default OkCancelButton;
