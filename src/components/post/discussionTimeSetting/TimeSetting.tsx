import React from "react";

import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useInput from "@/hooks/useInput";
// import DateConvertor from "@/utils/util-dateConvertor";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

import NonPortalModal from "../../modal/NonPortalModal";

import Calendar from "./calendar/Calendar";
import HalfDayInput from "./inputs/HalfDayInput";
import HourMinutesInput from "./inputs/HourMinutesInput";
import YearMonthDayInput from "./inputs/YearMonthDayInput";

const styles = {
  settingOpenButton: `flex items-center gap-[11px] py-[9px] px-[19px] border ${BORDER_COLOR.button}`,
  settingModalWrapper: `flex flex-col w-[445px] px-5 py-[30px] gap-[30px] ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
};

interface yearMonthDayInputs {
  type: "year" | "month" | "days";
  valueProps: {
    value: string | number;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    setValue: React.Dispatch<React.SetStateAction<string | number>>;
    resetHandler: () => void;
  };
}

const TimeSetting: React.FC = () => {
  const { modal, openModal, closeModal } = useModalController();

  const { getIcon } = useIcon();
  const downArrow = getIcon("downBtn", 10, 10);
  const calendar = getIcon("calendar", 24, 24);
  const focusedCalendar = getIcon("calendar_focus", 24, 24);

  const startHalfDay = useInput("오전");
  const startHour = useInput(12);
  const startMinutes = useInput(0);
  const endHalfDay = useInput("오전");
  const endHour = useInput(12);
  const endMinutes = useInput(0);
  const startYear = useInput(new Date().getFullYear());
  const startMonth = useInput(new Date().getMonth() + 1);
  const startDate = useInput(new Date().getDate());
  const endYear = useInput(new Date().getFullYear());
  const endMonth = useInput(new Date().getMonth() + 1);
  const endDate = useInput(new Date().getDate());

  const startYearMonthDayInputs: yearMonthDayInputs[] = [
    {
      type: "year",
      valueProps: startYear,
    },
    {
      type: "month",
      valueProps: startMonth,
    },
    {
      type: "days",
      valueProps: startDate,
    },
  ];
  const endYearMonthDayInputs: yearMonthDayInputs[] = [
    {
      type: "year",
      valueProps: endYear,
    },
    {
      type: "month",
      valueProps: endMonth,
    },
    {
      type: "days",
      valueProps: endDate,
    },
  ];

  // const startTime = DateConvertor.separatedValues(
  //   +startYear.value,
  //   +startMonth.value,
  //   +startDate.value,
  //   startHalfDay.value + "",
  //   +startHour.value,
  //   +startMinutes.value,
  // );
  // const endTime = DateConvertor.separatedValues(
  //   +startYear.value,
  //   +startMonth.value,
  //   +startDate.value,
  //   endHalfDay.value + "",
  //   +endHour.value,
  //   +endMinutes.value,
  // );

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
          <div className={styles.settingModalWrapper}>
            <div>
              <p className="mb-5">
                <span className="text-xl">시작 시간</span>
                (직접 입력하여 시간을 설정할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <HalfDayInput {...startHalfDay} />
                <HourMinutesInput time="start" type="hour" {...startHour} />
                <HourMinutesInput
                  time="start"
                  type="minutes"
                  {...startMinutes}
                />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">종료 시간</span>
                (직접 입력하여 시간을 설정할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <HalfDayInput {...endHalfDay} />
                <HourMinutesInput time="end" type="hour" {...endHour} />
                <HourMinutesInput time="end" type="minutes" {...endMinutes} />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">시작 기간</span>
                (시작 기간을 설정하여 예약할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                {startYearMonthDayInputs.map((input, i) => (
                  <div key={i}>
                    <YearMonthDayInput
                      testId="start"
                      type={input.type}
                      yearValue={startYear.value}
                      monthValue={startMonth.value}
                      dateValue={startDate.value}
                      setDate={startDate.setValue}
                      {...input.valueProps}
                    />
                  </div>
                ))}
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
                {endYearMonthDayInputs.map((input, i) => (
                  <div key={i}>
                    <YearMonthDayInput
                      testId="end"
                      type={input.type}
                      yearValue={endYear.value}
                      monthValue={endMonth.value}
                      dateValue={endDate.value}
                      setDate={endDate.setValue}
                      {...input.valueProps}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NonPortalModal>
      )}
    </div>
  );
};

export default TimeSetting;
