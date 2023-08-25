import React from "react";

import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useInput from "@/hooks/useInput";

import NonPortalModal from "../modal/NonPortalModal";

import CustomNumberInput from "./CustomNumberInput";

const styles = {
  settingOpenButton: `flex items-center gap-[11px] py-[9px] px-[19px] border ${BORDER_COLOR.button}`,
};

const TimeSetting = () => {
  const { modal, openModal, closeModal } = useModalController();
  const { getIcon } = useIcon();
  const downArrow = getIcon("downBtn", 10, 10);

  const startHalfDay = useInput("오전");
  const startHour = useInput(12);
  const startMinutes = useInput(0);
  const endHalfDay = useInput("오전");
  const endHour = useInput(12);
  const endMinutes = useInput(0);
  const month = useInput(new Date().getMonth() + 1);
  const days = useInput(new Date().getDate());

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.settingOpenButton}
        type="button"
        onClick={() => {
          modal.defaultModal
            ? closeModal("defaultModal")
            : openModal("defaultModal");
        }}
      >
        <span>토의 시간 설정</span>
        <span>{downArrow}</span>
      </button>
      {modal.defaultModal && (
        <NonPortalModal topLeft={{ top: 44, left: 0 }} nonBackdrop>
          <div
            className={`flex flex-col w-[445px] px-5 py-[30px] gap-[30px] ${BG_COLOR.primary} ${BORDER_COLOR.button}`}
          >
            <div>
              <p className="mb-5">
                <span className="text-xl">시작 시간</span>
                (직접 입력하여 시간을 설정할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <CustomNumberInput type="halfDay" {...startHalfDay} />
                <CustomNumberInput type="hour" {...startHour} />
                <CustomNumberInput type="minutes" {...startMinutes} />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">종료 시간</span>
                (직접 입력하여 시간을 설정할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <CustomNumberInput type="halfDay" {...endHalfDay} />
                <CustomNumberInput type="hour" {...endHour} />
                <CustomNumberInput type="minutes" {...endMinutes} />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">기간</span>
                (시작 기간을 설정하여 예약할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <CustomNumberInput type="month" {...month} />
                <CustomNumberInput type="days" {...days} />
              </div>
            </div>
          </div>
        </NonPortalModal>
      )}
    </div>
  );
};

export default TimeSetting;
