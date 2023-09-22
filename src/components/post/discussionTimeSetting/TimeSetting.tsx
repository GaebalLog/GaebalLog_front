import React from "react";

import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useInput from "@/hooks/useInput";
import { DateConvertor } from "@/utils/util-date";

import NonPortalModal from "../../modal/NonPortalModal";

import Calendar from "./calendar/Calendar";
import HalfDayInput from "./inputs/HalfDayInput";
import HourMinutesInput from "./inputs/HourMinutesInput";
import YearMonthDayInput from "./inputs/YearMonthDayInput";

const styles = {
  settingOpenButton: `flex items-center gap-[11px] py-[9px] px-[19px] border ${BORDER_COLOR.button}`,
  settingModalWrapper: `flex flex-col w-[445px] px-5 py-[30px] gap-[30px] ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
};

interface timeSettingProps {
  setTimeSetting: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
}

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

const TimeSetting: React.FC<timeSettingProps> = ({ setTimeSetting }) => {
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
  const year = useInput(new Date().getFullYear());
  const month = useInput(new Date().getMonth() + 1);
  const date = useInput(new Date().getDate());

  const yearMonthDayInputs: yearMonthDayInputs[] = [
    {
      type: "year",
      valueProps: year,
    },
    {
      type: "month",
      valueProps: month,
    },
    {
      type: "days",
      valueProps: date,
    },
  ];

  const startDate = DateConvertor.separatedValues(
    +year.value,
    +month.value,
    +date.value,
    startHalfDay.value + "",
    +startHour.value,
    +startMinutes.value,
  );
  const endDate = DateConvertor.separatedValues(
    +year.value,
    +month.value,
    +date.value,
    endHalfDay.value + "",
    +endHour.value,
    +endMinutes.value,
  );

  React.useEffect(() => {
    setTimeSetting({
      startDate: startDate.convertToISOString(),
      endDate: endDate.convertToISOString(),
    });
  }, [
    year.value,
    month.value,
    date.value,
    startHalfDay.value,
    startHour.value,
    startMinutes.value,
    endHalfDay.value,
    endHour.value,
    endMinutes.value,
  ]);

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
                <HourMinutesInput type="hour" {...startHour} />
                <HourMinutesInput type="minutes" {...startMinutes} />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">종료 시간</span>
                (직접 입력하여 시간을 설정할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                <HalfDayInput {...endHalfDay} />
                <HourMinutesInput type="hour" {...endHour} />
                <HourMinutesInput type="minutes" {...endMinutes} />
              </div>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xl">기간</span>
                (시작 기간을 설정하여 예약할 수 있습니다.)
              </p>
              <div className="flex gap-4">
                {yearMonthDayInputs.map((input, i) => (
                  <div key={i}>
                    <YearMonthDayInput
                      type={input.type}
                      yearValue={year.value}
                      monthValue={month.value}
                      dateValue={date.value}
                      setDate={date.setValue}
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
                        <Calendar
                          yearValue={+year.value}
                          monthValue={+month.value}
                          dateValue={+date.value}
                          setYearValue={year.setValue}
                          setMonthValue={month.setValue}
                          setDateValue={date.setValue}
                        />
                      </NonPortalModal>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </NonPortalModal>
      )}
    </div>
  );
};

export default TimeSetting;
