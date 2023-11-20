import React from "react";

import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import { BG_COLOR, BORDER_COLOR } from "@/config/constants/colors";
import TimeSettingProvider from "@/components/provider/TimeSettingProvider";
import TimeSettingManager from "@/utils/util-timeSettingManager";

import NonPortalModal from "../../modal/NonPortalModal";

import Calendar from "./calendar/Calendar";
import HalfDayInput from "./inputs/HalfDayInput";
import HourInput from "./inputs/HourInput";
import YearInput from "./inputs/YearInput";
import MonthInput from "./inputs/MonthInput";
import DayInput from "./inputs/DayInput";
import MinutesInput from "./inputs/MinutesInput";

const styles = {
  settingOpenButton: `flex items-center gap-[11px] py-[9px] px-[19px] border ${BORDER_COLOR.button}`,
  settingModalWrapper: `flex flex-col w-[445px] px-5 py-[30px] gap-[30px] ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
};

interface props {
  timeSetting: {
    startDate: string;
    endDate: string;
  };
  setTimeSetting: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
}

const TimeSetting: React.FC<props> = ({ timeSetting, setTimeSetting }) => {
  const { modal, openModal, closeModal } = useModalController();
  const { isDifferenceLessThan15Minutes } = new TimeSettingManager(
    timeSetting.startDate,
    timeSetting.endDate,
  );

  const { getIcon } = useIcon();
  const downArrow = getIcon("downBtn", 10, 10);
  const calendar = getIcon("calendar", 24, 24);
  const focusedCalendar = getIcon("calendar_focus", 24, 24);

  React.useEffect(() => {
    if (!modal.defaultModal && isDifferenceLessThan15Minutes) {
      alert("토의 시간은 최소 15분 이상으로 설정 해 주세요.");
    }
  }, [modal.defaultModal]);

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
        <TimeSettingProvider
          timeSetting={timeSetting}
          setTimeSetting={setTimeSetting}
        >
          <NonPortalModal topLeft={{ top: 44, left: 0 }} nonBackdrop>
            <div className={styles.settingModalWrapper}>
              <div>
                <p className="mb-5">
                  <span className="text-xl">시작 시간</span>
                  (직접 입력하여 시간을 설정할 수 있습니다.)
                </p>
                <div className="flex gap-4">
                  <HalfDayInput time="start" />
                  <HourInput time="start" />
                  <MinutesInput time="start" />
                </div>
              </div>
              <div>
                <p className="mb-5">
                  <span className="text-xl">종료 시간</span>
                  (직접 입력하여 시간을 설정할 수 있습니다.)
                </p>
                <div className="flex gap-4">
                  <HalfDayInput time="end" />
                  <HourInput time="end" />
                  <MinutesInput time="end" />
                </div>
              </div>
              <div>
                <p className="mb-5">
                  <span className="text-xl">시작 기간</span>
                  (시작 기간을 설정하여 예약할 수 있습니다.)
                </p>
                <div className="flex gap-4">
                  <YearInput time="start" />
                  <MonthInput time="start" />
                  <DayInput time="start" />
                  <div
                    data-testid="calendar"
                    className={`relative flex justify-center items-center w-[45px] h-[45px] ${BORDER_COLOR.button} cursor-pointer`}
                    onClick={() => openModal("calendarModal")}
                  >
                    {modal.calendarModal ? focusedCalendar : calendar}
                    {modal.calendarModal && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <NonPortalModal
                          topLeft={{ top: 43, left: -130 }}
                          onBackdropClick={() => closeModal("calendarModal")}
                        >
                          <Calendar />
                        </NonPortalModal>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-5">
                  <span className="text-xl">종료 기간</span>
                  (시작 기간을 설정하여 예약할 수 있습니다.)
                </p>
                <div className="flex gap-4">
                  <YearInput time="end" />
                  <MonthInput time="end" />
                  <DayInput time="end" />
                </div>
              </div>
            </div>
          </NonPortalModal>
        </TimeSettingProvider>
      )}
    </div>
  );
};

export default TimeSetting;
