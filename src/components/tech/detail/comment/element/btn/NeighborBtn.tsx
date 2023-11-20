import React from "react";
import { useSetRecoilState } from "recoil";

import Button from "@/components/UI/buttons/base/Button";
import NonPortalModal from "@/components/UI/modals/base/NonPortalModal";
import { BORDER_COLOR } from "@/config/constants/colors";
import { mypageApi } from "@/config/api/mypageApi";
import { activatedModalIdAtom } from "@/hooks/useModalController";

interface props {
  userId: string;
  isNeighbor: boolean | null;
}

const NeighborBtn: React.FC<props> = ({ userId, isNeighbor }) => {
  const setActivatedId = useSetRecoilState(activatedModalIdAtom);

  const addNeighbor = async () => {
    try {
      await mypageApi.addNeighbor(userId);
    } catch (error) {
      console.log(error);
    }
    setActivatedId(null);
  };
  const deleteNeighbor = async () => {
    try {
      await mypageApi.deleteNeighbor(userId);
    } catch (error) {
      console.log(error);
    }
    setActivatedId(null);
  };

  if (isNeighbor === null) return;
  return (
    <NonPortalModal
      topLeft={{ top: 15, right: 50 }}
      onBackdropClick={() => setActivatedId(null)}
    >
      <div className={`flex flex-col ${BORDER_COLOR.button}`}>
        <Button
          className={`py-4 px-[30px]`}
          size="tab"
          color="white"
          onClick={isNeighbor ? deleteNeighbor : addNeighbor}
        >
          {isNeighbor ? "이웃삭제" : "이웃추가"}
        </Button>
      </div>
    </NonPortalModal>
  );
};

export default NeighborBtn;
