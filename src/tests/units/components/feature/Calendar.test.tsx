import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useInput from "@/hooks/useInput";
import Provider from "@/components/provider/Provider";
import Calendar from "@/components/post/discussionTimeSetting/calendar/Calendar";
import TimeSetting from "@/components/post/discussionTimeSetting/TimeSetting";

describe("달력 테스트", () => {
  beforeEach(() => {
    render(<CalendarTestComponent />, { wrapper: Provider });
  });

  const CalendarTestComponent = () => {
    const startYear = useInput(2023);
    const startMonth = useInput(9);
    const startDate = useInput(26);
    const endYear = useInput(2023);
    const endMonth = useInput(9);
    const endDate = useInput(26);
    return (
      <Calendar
        startYearValue={+startYear.value}
        startMonthValue={+startMonth.value}
        startDateValue={+startDate.value}
        endYearValue={+endYear.value}
        endMonthValue={+endMonth.value}
        endDateValue={+endDate.value}
        setStartYearValue={startYear.setValue}
        setStartMonthValue={startMonth.setValue}
        setStartDateValue={startDate.setValue}
        setEndYearValue={endYear.setValue}
        setEndMonthValue={endMonth.setValue}
        setEndDateValue={endDate.setValue}
      />
    );
  };

  test("과거날짜 누르면 알럿이 떠야 함", async () => {
    await userEvent.click(await screen.findByTestId("prev_month"));
    await userEvent.click(await screen.findByText("25"));
    expect(window.alert).toHaveBeenCalledWith("이미 지난 날짜입니다.");
  });

  test("달 이동 테스트", async () => {
    const nextButton = await screen.findByTestId("next_month");
    const prevButton = await screen.findByTestId("prev_month");
    await userEvent.click(nextButton);
    expect(
      await screen.findByText(`. 10`, { exact: false }),
    ).toBeInTheDocument();
    await userEvent.click(prevButton);
    expect(
      await screen.findByText(`. 9`, { exact: false }),
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
      await screen.findByTestId(`currentMonthDay_${new Date().getDate()}`),
    ).toHaveClass("bg-[#967AC3]");
  });

  test("달력에서 날짜를 선택하면 인풋에 반영되어야 함", async () => {
    await userEvent.click(await screen.findByTestId("next_month"));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    expect(await screen.findByDisplayValue("01일")).toBeInTheDocument();
  });

  test("달력의 선택된 날짜는 색이 바뀌어야 함", async () => {
    await userEvent.click(await screen.findByTestId("next_month"));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    await userEvent.click(await screen.findByText("시작 시간"));
    await userEvent.click(await screen.findByTestId("calendar"));
    expect(await screen.findByTestId(`currentMonthDay_1`)).toHaveClass(
      "bg-[#967AC3]",
    );
  });
});
