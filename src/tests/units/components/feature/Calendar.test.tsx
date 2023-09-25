import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useInput from "@/hooks/useInput";
import Provider from "@/components/provider/Provider";
import Calendar from "@/components/post/discussionTimeSetting/calendar/Calendar";
import TimeSetting from "@/components/post/discussionTimeSetting/TimeSetting";
import CalendarManager from "@/utils/util-calendarManager";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const calendarManager = new CalendarManager(year, month, { year, month, date });

describe("달력 테스트", () => {
  beforeEach(() => {
    render(<CalendarTestComponent />, { wrapper: Provider });
  });

  const CalendarTestComponent = () => {
    const year = useInput(today.getFullYear());
    const month = useInput(today.getMonth());
    const date = useInput(today.getDate());
    return (
      <Calendar
        yearValue={+year.value}
        monthValue={+month.value}
        dateValue={+date.value}
        setYearValue={year.setValue}
        setMonthValue={month.setValue}
        setDateValue={date.setValue}
      />
    );
  };

  test("이전 달 일을 누르면 이전 달로 이동해야 함 / 과거날짜 누르면 알럿이 떠야 함", async () => {
    const prevMonthLastDate = calendarManager.getPrevMonthLastDate();
    const prevMonthLastDay = await screen.findByTestId(
      `prevMonthDay_${prevMonthLastDate}`,
    );
    await userEvent.click(prevMonthLastDay);
    expect(
      await screen.findByText(`. ${today.getMonth() - 1}`, { exact: false }),
    ).toBeInTheDocument();

    await userEvent.click(await screen.findByText("15"));
    expect(window.alert).toHaveBeenCalledWith("이미 지난 날짜입니다.");
  });

  test("다음 달 일을 누르면 다음 달로 이동해야 함", async () => {
    await userEvent.click(await screen.findByTestId(`nextMonthDay_1`));
    expect(
      await screen.findByText(`. ${today.getMonth() + 1}`, { exact: false }),
    ).toBeInTheDocument();
  });

  test("달 이동 테스트", async () => {
    const nextButton = await screen.findByTestId("next_month");
    const prevButton = await screen.findByTestId("prev_month");
    await userEvent.click(nextButton);
    expect(
      await screen.findByText(`. ${today.getMonth() + 1}`, { exact: false }),
    ).toBeInTheDocument();
    await userEvent.click(prevButton);
    expect(
      await screen.findByText(`. ${today.getMonth()}`, { exact: false }),
    ).toBeInTheDocument();
  });
});

describe("달력 날짜 선택 테스트", () => {
  beforeEach(async () => {
    render(<TimeSetting setTimeSetting={jest.fn} />, { wrapper: Provider });
    await userEvent.click(await screen.findByText("토의 시간 설정"));
    await userEvent.click(await screen.findByTestId("calendar"));
  });

  test("달력을 열면 오늘 날짜가 선택되어 있어야 함", async () => {
    expect(
      await screen.findByTestId(`currentMonthDay_${today.getDate()}`),
    ).toHaveClass("bg-[#967AC3]");
  });

  test("달력에서 날짜를 선택하면 달력이 사라지고 인풋에 반영되어야 함", async () => {
    await userEvent.click(await screen.findByTestId(`nextMonthDay_1`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    expect(screen.queryByTestId(`currentMonthDay_1`)).not.toBeInTheDocument();
    expect(await screen.findByDisplayValue("01일")).toBeInTheDocument();
  });

  test("달력의 선택된 날짜는 색이 바뀌어야 함", async () => {
    await userEvent.click(await screen.findByTestId(`nextMonthDay_1`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    await userEvent.click(await screen.findByTestId("calendar"));
    expect(await screen.findByTestId(`currentMonthDay_1`)).toHaveClass(
      "bg-[#967AC3]",
    );
  });
});
