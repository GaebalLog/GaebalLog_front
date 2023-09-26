"use client";

import React from "react";

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
  startHalfDayValue: string;
  setStartHalfDayValue: (value: ((prev: string) => string) | string) => void;
  startHourValue: string | number;
  setStartHourValue: (
    value: ((prev: string | number) => string | number) | string | number,
  ) => void;
  startMinutesValue: string | number;
  setStartMinutesValue: (
    value: ((prev: string | number) => string | number) | string | number,
  ) => void;
  endHalfDayValue: string;
  setEndHalfDayValue: (value: ((prev: string) => string) | string) => void;
  endHourValue: string | number;
  setEndHourValue: (
    value: ((prev: string | number) => string | number) | string | number,
  ) => void;
  endMinutesValue: string | number;
  setEndMinutesValue: (
    value: ((prev: string | number) => string | number) | string | number,
  ) => void;
  startYearValue: string;
  setStartYearValue: (value: string) => void;
  startMonthValue: string;
  setStartMonthValue: (value: string) => void;
  startDateValue: string;
  setStartDateValue: (value: string) => void;
  endYearValue: string;
  setEndYearValue: (value: string) => void;
  endMonthValue: string;
  setEndMonthValue: (value: string) => void;
  endDateValue: string;
  setEndDateValue: (value: string) => void;
}

export const TimeContext = React.createContext<TimeContextType>({
  startHalfDayValue: "",
  setStartHalfDayValue: () => {},
  startHourValue: "",
  setStartHourValue: () => {},
  startMinutesValue: "",
  setStartMinutesValue: () => {},
  endHalfDayValue: "",
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
  timeSetting,
  setTimeSetting,
  children,
}) => {
  const parsedStartTime = new Date(timeSetting.startTime);
  const parsedEndTime = new Date(timeSetting.endTime);
  const calculatedStartHour =
    parsedStartTime.getHours() <= 12
      ? parsedStartTime.getHours()
      : parsedStartTime.getHours() - 12;
  const calculatedEndHour =
    parsedEndTime.getHours() <= 12
      ? parsedEndTime.getHours()
      : parsedEndTime.getHours() - 12;

  const [startHalfDayValue, setStartHalfDayValue] = React.useState(
    parsedStartTime.getHours() < 12 ? "오전" : "오후",
  );
  const [startHourValue, setStartHourValue] = React.useState<string | number>(
    calculatedStartHour,
  );
  const [startMinutesValue, setStartMinutesValue] = React.useState<
    string | number
  >(parsedStartTime.getMinutes());

  const [endHalfDayValue, setEndHalfDayValue] = React.useState(
    parsedEndTime.getHours() < 12 ? "오전" : "오후",
  );
  const [endHourValue, setEndHourValue] = React.useState<string | number>(
    calculatedEndHour,
  );
  const [endMinutesValue, setEndMinutesValue] = React.useState<string | number>(
    parsedEndTime.getMinutes(),
  );

  const [startYearValue, setStartYearValue] = React.useState(
    parsedStartTime.getFullYear() + "",
  );
  const [startMonthValue, setStartMonthValue] = React.useState(
    parsedStartTime.getMonth() + 1 + "",
  );
  const [startDateValue, setStartDateValue] = React.useState(
    parsedStartTime.getDate() + "",
  );

  const [endYearValue, setEndYearValue] = React.useState(
    parsedEndTime.getFullYear() + "",
  );
  const [endMonthValue, setEndMonthValue] = React.useState(
    parsedEndTime.getMonth() + 1 + "",
  );
  const [endDateValue, setEndDateValue] = React.useState(
    parsedEndTime.getDate() + "",
  );

  const startTime = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    startHalfDayValue,
    +startHourValue,
    +startMinutesValue,
  );
  const endTime = DateConvertor.separatedValues(
    +startYearValue,
    +startMonthValue,
    +startDateValue,
    endHalfDayValue,
    +endHourValue,
    +endMinutesValue,
  );

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
