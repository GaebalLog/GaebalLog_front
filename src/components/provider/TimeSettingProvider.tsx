"use client";

import React from "react";

import DateConvertor from "@/utils/util-dateConvertor";
import TimeSettingManager from "@/utils/util-timeSettingManager";

interface props {
  children: React.ReactNode;
  timeSetting: {
    startDate: string;
    endDate: string;
  };
  setTimeSetting: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
}

export interface TimeContextType {
  startHalfDayValue: "오전" | "오후";
  setStartHalfDayValue: React.Dispatch<React.SetStateAction<"오전" | "오후">>;
  startHourValue: string | number;
  setStartHourValue: React.Dispatch<React.SetStateAction<string | number>>;
  startMinutesValue: string | number;
  setStartMinutesValue: React.Dispatch<React.SetStateAction<string | number>>;
  endHalfDayValue: "오전" | "오후";
  setEndHalfDayValue: React.Dispatch<React.SetStateAction<"오전" | "오후">>;
  endHourValue: string | number;
  setEndHourValue: React.Dispatch<React.SetStateAction<string | number>>;
  endMinutesValue: string | number;
  setEndMinutesValue: React.Dispatch<React.SetStateAction<string | number>>;
  startYearValue: string | number;
  setStartYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  startMonthValue: string | number;
  setStartMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  startDateValue: string | number;
  setStartDateValue: React.Dispatch<React.SetStateAction<string | number>>;
  endYearValue: string | number;
  setEndYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  endMonthValue: string | number;
  setEndMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  endDateValue: string | number;
  setEndDateValue: React.Dispatch<React.SetStateAction<string | number>>;
}

export const TimeContext = React.createContext<TimeContextType>({
  startHalfDayValue: "오전",
  setStartHalfDayValue: () => {},
  startHourValue: "",
  setStartHourValue: () => {},
  startMinutesValue: "",
  setStartMinutesValue: () => {},
  endHalfDayValue: "오전",
  setEndHalfDayValue: () => {},
  endHourValue: "",
  setEndHourValue: () => {},
  endMinutesValue: "",
  setEndMinutesValue: () => {},
  startYearValue: "",
  setStartYearValue: () => {},
  startMonthValue: "",
  setStartMonthValue: () => {},
  startDateValue: "",
  setStartDateValue: () => {},
  endYearValue: "",
  setEndYearValue: () => {},
  endMonthValue: "",
  setEndMonthValue: () => {},
  endDateValue: "",
  setEndDateValue: () => {},
});

const TimeSettingProvider: React.FC<props> = ({
  timeSetting: { startDate, endDate },
  setTimeSetting,
  children,
}) => {
  const time = new TimeSettingManager(startDate, endDate);

  const [startHalfDayValue, setStartHalfDayValue] = React.useState<
    "오전" | "오후"
  >(time.startTimeHalfDay);
  const [startHourValue, setStartHourValue] = React.useState<string | number>(
    time.calculatedStartHour,
  );
  const [startMinutesValue, setStartMinutesValue] = React.useState<
    string | number
  >(time.startTimeMinutes);

  const [endHalfDayValue, setEndHalfDayValue] = React.useState<"오전" | "오후">(
    time.endTimeHalfDay,
  );
  const [endHourValue, setEndHourValue] = React.useState<string | number>(
    time.calculatedEndHour,
  );
  const [endMinutesValue, setEndMinutesValue] = React.useState<string | number>(
    time.endTimeMinutes,
  );

  const [startYearValue, setStartYearValue] = React.useState<string | number>(
    time.startTimeYear,
  );
  const [startMonthValue, setStartMonthValue] = React.useState<string | number>(
    time.startTimeMonth,
  );
  const [startDateValue, setStartDateValue] = React.useState<string | number>(
    time.startTimeDate,
  );

  const [endYearValue, setEndYearValue] = React.useState<string | number>(
    time.endTimeYear,
  );
  const [endMonthValue, setEndMonthValue] = React.useState<string | number>(
    time.endTimeMonth,
  );
  const [endDateValue, setEndDateValue] = React.useState<string | number>(
    time.endTimeDate,
  );

  const startDateConvertor = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    startHalfDayValue,
    +startHourValue,
    +startMinutesValue,
  );
  const endDateConvertor = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    endHalfDayValue,
    +endHourValue,
    +endMinutesValue,
  );

  React.useEffect(() => {
    setTimeSetting({
      startDate: startDateConvertor.convertToISOString(),
      endDate: endDateConvertor.convertToISOString(),
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
