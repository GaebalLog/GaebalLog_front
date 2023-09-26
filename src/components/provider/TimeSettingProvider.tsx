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
  setStartHalfDayValue: React.Dispatch<React.SetStateAction<string>>;
  startHourValue: string | number;
  setStartHourValue: React.Dispatch<React.SetStateAction<string | number>>;
  startMinutesValue: string | number;
  setStartMinutesValue: React.Dispatch<React.SetStateAction<string | number>>;
  endHalfDayValue: string;
  setEndHalfDayValue: React.Dispatch<React.SetStateAction<string>>;
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

  const [startYearValue, setStartYearValue] = React.useState<string | number>(
    parsedStartTime.getFullYear(),
  );
  const [startMonthValue, setStartMonthValue] = React.useState<string | number>(
    parsedStartTime.getMonth() + 1,
  );
  const [startDateValue, setStartDateValue] = React.useState<string | number>(
    parsedStartTime.getDate(),
  );

  const [endYearValue, setEndYearValue] = React.useState<string | number>(
    parsedEndTime.getFullYear(),
  );
  const [endMonthValue, setEndMonthValue] = React.useState<string | number>(
    parsedEndTime.getMonth() + 1,
  );
  const [endDateValue, setEndDateValue] = React.useState<string | number>(
    parsedEndTime.getDate(),
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
