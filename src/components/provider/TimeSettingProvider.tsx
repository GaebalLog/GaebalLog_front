"use client";

import React from "react";

import useInput from "@/hooks/useInput";
import DateConvertor from "@/utils/util-dateConvertor";

interface props {
  children: React.ReactNode;
  timeSetting: {
    startTime: string;
    endTime: string;
  };
  setTimeSetting: React.Dispatch<
    React.SetStateAction<{ startTime: string; endTime: string }>
  >;
}

export interface TimeContextType {
  startHalfDayValue: string | number;
  setStartHalfDayValue: (value: string | number) => void;
  startHourValue: string | number;
  setStartHourValue: (value: string | number) => void;
  startMinutesValue: string | number;
  setStartMinutesValue: (value: string | number) => void;
  endHalfDayValue: string | number;
  setEndHalfDayValue: (value: string | number) => void;
  endHourValue: string | number;
  setEndHourValue: (value: string | number) => void;
  endMinutesValue: string | number;
  setEndMinutesValue: (value: string | number) => void;
  startYearValue: string | number;
  setStartYearValue: (value: string | number) => void;
  startMonthValue: string | number;
  setStartMonthValue: (value: string | number) => void;
  startDateValue: string | number;
  setStartDateValue: (value: string | number) => void;
  endYearValue: string | number;
  setEndYearValue: (value: string | number) => void;
  endMonthValue: string | number;
  setEndMonthValue: (value: string | number) => void;
  endDateValue: string | number;
  setEndDateValue: (value: string | number) => void;
}

export const TimeContext = React.createContext<TimeContextType>({
  startHalfDayValue: "",
  setStartHalfDayValue: () => {},
  startHourValue: 0,
  setStartHourValue: () => {},
  startMinutesValue: 0,
  setStartMinutesValue: () => {},
  endHalfDayValue: "",
  setEndHalfDayValue: () => {},
  endHourValue: 0,
  setEndHourValue: () => {},
  endMinutesValue: 0,
  setEndMinutesValue: () => {},
  startYearValue: 0,
  setStartYearValue: () => {},
  startMonthValue: 0,
  setStartMonthValue: () => {},
  startDateValue: 0,
  setStartDateValue: () => {},
  endYearValue: 0,
  setEndYearValue: () => {},
  endMonthValue: 0,
  setEndMonthValue: () => {},
  endDateValue: 0,
  setEndDateValue: () => {},
});

const TimeSettingProvider: React.FC<props> = ({
  timeSetting,
  setTimeSetting,
  children,
}) => {
  const parsedStartTime = new Date(timeSetting.startTime);
  const parsedEndTime = new Date(timeSetting.endTime);
  const calculatedHour =
    parsedStartTime.getHours() <= 12
      ? parsedStartTime.getHours()
      : parsedStartTime.getHours() - 12;

  const { value: startHalfDayValue, setValue: setStartHalfDayValue } = useInput(
    parsedStartTime.getHours() < 12 ? "오전" : "오후",
  );
  const { value: startHourValue, setValue: setStartHourValue } =
    useInput(calculatedHour);
  const { value: startMinutesValue, setValue: setStartMinutesValue } = useInput(
    parsedStartTime.getMinutes(),
  );

  const { value: endHalfDayValue, setValue: setEndHalfDayValue } = useInput(
    parsedEndTime.getHours() < 12 ? "오전" : "오후",
  );
  const { value: endHourValue, setValue: setEndHourValue } =
    useInput(calculatedHour);
  const { value: endMinutesValue, setValue: setEndMinutesValue } = useInput(
    parsedEndTime.getMinutes(),
  );

  const { value: startYearValue, setValue: setStartYearValue } = useInput(
    parsedStartTime.getFullYear(),
  );
  const { value: startMonthValue, setValue: setStartMonthValue } = useInput(
    parsedStartTime.getMonth() + 1,
  );
  const { value: startDateValue, setValue: setStartDateValue } = useInput(
    parsedStartTime.getDate(),
  );

  const { value: endYearValue, setValue: setEndYearValue } = useInput(
    parsedEndTime.getFullYear(),
  );
  const { value: endMonthValue, setValue: setEndMonthValue } = useInput(
    parsedEndTime.getMonth() + 1,
  );
  const { value: endDateValue, setValue: setEndDateValue } = useInput(
    parsedEndTime.getDate(),
  );

  const startTime = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    startHalfDayValue + "",
    +startHourValue,
    +startMinutesValue,
  );
  const endTime = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    endHalfDayValue + "",
    +endHourValue,
    +endMinutesValue,
  );
  console.log(startDateValue);

  React.useEffect(() => {
    setTimeSetting({
      startTime: startTime.convertToISOString(),
      endTime: endTime.convertToISOString(),
    });
  }, [
    startYearValue,
    startMonthValue,
    startDateValue,
    startHalfDayValue,
    startHourValue,
    startMinutesValue,
    endHalfDayValue,
    endHourValue,
    endMinutesValue,
  ]);

  return (
    <TimeContext.Provider
      value={{
        startHalfDayValue,
        setStartHalfDayValue,
        startHourValue,
        setStartHourValue,
        startMinutesValue,
        setStartMinutesValue,
        endHalfDayValue,
        setEndHalfDayValue,
        endHourValue,
        setEndHourValue,
        endMinutesValue,
        setEndMinutesValue,
        startYearValue,
        setStartYearValue,
        startMonthValue,
        setStartMonthValue,
        startDateValue,
        setStartDateValue,
        endYearValue,
        setEndYearValue,
        endMonthValue,
        setEndMonthValue,
        endDateValue,
        setEndDateValue,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeSettingProvider;
