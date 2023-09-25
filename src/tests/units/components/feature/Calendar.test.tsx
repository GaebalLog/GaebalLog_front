import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useInput from "@/hooks/useInput";
import Provider from "@/components/provider/Provider";
import Calendar from "@/components/post/discussionTimeSetting/calendar/Calendar";
import TimeSetting from "@/components/post/discussionTimeSetting/TimeSetting";
import { BG_COLOR } from "@/constants/global/colors";

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDate = today.getDate();

describe("달력 테스트", () => {
  beforeEach(() => {
    render(<CalendarTestComponent />, { wrapper: Provider });
  });

  const CalendarTestComponent = () => {
    const startYear = useInput(todayYear);
    const startMonth = useInput(todayMonth);
    const startDate = useInput(todayDate);
    const endYear = useInput(todayYear);
    const endMonth = useInput(todayMonth);
    const endDate = useInput(todayDate);
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
    await userEvent.click(await screen.findByText("15"));
    expect(window.alert).toHaveBeenCalledWith("이미 지난 날짜입니다.");
  });

  test("달 이동 테스트", async () => {
    await userEvent.click(await screen.findByTestId("next_month"));
    if (todayMonth === 12) {
      expect(
        await screen.findByText(`. 1}`, { exact: false }),
      ).toBeInTheDocument();
    } else {
      expect(
        await screen.findByText(`. ${todayMonth + 1}`, { exact: false }),
      ).toBeInTheDocument();
    }
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(
      await screen.findByText(`. ${todayMonth}`, { exact: false }),
    ).toBeInTheDocument();
  });
});

describe("달력 날짜 선택 테스트", () => {
  let startYearInput: Promise<HTMLElement>,
    startMonthInput: Promise<HTMLElement>,
    startDayInput: Promise<HTMLElement>,
    endtYearInput: Promise<HTMLElement>,
    endtMonthInput: Promise<HTMLElement>,
    endtDayInput: Promise<HTMLElement>;

  beforeEach(async () => {
    render(<TimeSetting setTimeSetting={jest.fn} />, { wrapper: Provider });
    await userEvent.click(await screen.findByText("토의 시간 설정"));

    startYearInput = screen.findByTestId(`startyear_input`);
    startMonthInput = screen.findByTestId(`startmonth_input`);
    startDayInput = screen.findByTestId(`startdays_input`);
    endtYearInput = screen.findByTestId(`endyear_input`);
    endtMonthInput = screen.findByTestId(`endmonth_input`);
    endtDayInput = screen.findByTestId(`enddays_input`);
  });

  const inputType = async (
    startYear: string,
    startMonth: string,
    startDate: string,
    endYear: string,
    endMonth: string,
    endDate: string,
  ) => {
    await userEvent.clear(await startYearInput);
    await userEvent.type(await startYearInput, startYear);
    await userEvent.clear(await startMonthInput);
    await userEvent.type(await startMonthInput, startMonth);
    await userEvent.clear(await startDayInput);
    await userEvent.type(await startDayInput, startDate);
    await userEvent.clear(await endtYearInput);
    await userEvent.type(await endtYearInput, endYear);
    await userEvent.clear(await endtMonthInput);
    await userEvent.type(await endtMonthInput, endMonth);
    await userEvent.clear(await endtDayInput);
    await userEvent.type(await endtDayInput, endDate);
  };

  test("달력에서 날짜를 선택하면 인풋에 반영되어야 함", async () => {
    await userEvent.click(await screen.findByTestId("calendar"));
    await userEvent.click(
      await screen.findByTestId(`currentMonthDay_${new Date().getDate()}`),
    );
    await userEvent.click(await screen.findByTestId("next_month"));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_2`));
    expect(await screen.findByDisplayValue("01일")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("02일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId(`currentMonthDay_2`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_5`));
    expect(await screen.findByDisplayValue("01일")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("05일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_2`));
    expect(await screen.findByDisplayValue("02일")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("05일")).toBeInTheDocument();
  });

  test("달력을 열면 오늘 날짜가 선택되어 있어야 함", async () => {
    await userEvent.click(await screen.findByTestId("calendar"));
    expect(
      await screen.findByTestId(`currentMonthDay_${new Date().getDate()}`),
    ).toHaveClass("bg-[#967AC3]");
  });

  test("달력의 선택된 날짜는 색이 바뀌어야 함", async () => {
    await userEvent.click(await screen.findByTestId("calendar"));
    await userEvent.click(
      await screen.findByTestId(`currentMonthDay_${new Date().getDate()}`),
    );
    await userEvent.click(await screen.findByTestId("next_month"));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_1`));
    await userEvent.click(await screen.findByTestId(`currentMonthDay_2`));
    await userEvent.click(await screen.findByText("시작 시간"));
    await userEvent.click(await screen.findByTestId("calendar"));
    expect(await screen.findByTestId(`currentMonthDay_1`)).toHaveClass(
      "bg-[#967AC3]",
    );
    expect(await screen.findByTestId(`currentMonthDay_2`)).toHaveClass(
      "bg-[#967AC3]",
    );
  });

  test("입력된 인풋의 날짜대로 달력이 열려야함", async () => {
    await inputType("2100", "10", "01", "2100", "10", "02");

    await userEvent.click(await screen.findByTestId("calendar"));

    expect(await screen.findByText(`2100. 10`)).toBeInTheDocument();
    expect(await screen.findByTestId(`currentMonthDay_1`)).toHaveClass(
      "bg-[#967AC3]",
    );
    expect(await screen.findByTestId(`currentMonthDay_2`)).toHaveClass(
      "bg-[#967AC3]",
    );
  });

  test("선택된 날짜들이 같은 '월'일 때 테스트", async () => {
    await inputType("2100", "10", "01", "2100", "10", "15");

    await userEvent.click(await screen.findByTestId("calendar"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_10`)).toHaveClass(
      BG_COLOR.general04,
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_15`)).toHaveClass(
      "mr-1 pl-1 rounded-r-full",
    );

    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(
      await screen.findByTestId(`currentMonthDayStyle_10`),
    ).not.toHaveClass(BG_COLOR.general04);
  });

  test("선택된 날짜들이 같은 '년도'일 때 테스트", async () => {
    await inputType("2100", "10", "01", "2100", "12", "15");

    await userEvent.click(await screen.findByTestId("calendar"));

    // 12월
    expect(await screen.findByTestId(`currentMonthDayStyle_15`)).toHaveClass(
      "mr-1 pl-1 rounded-r-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_10`)).toHaveClass(
      BG_COLOR.general04,
    );

    // 11월
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).not.toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).toHaveClass(
      BG_COLOR.general04,
    );

    // 10월
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_10`)).toHaveClass(
      BG_COLOR.general04,
    );
  });

  test("선택된 날짜들이 다른 '년도'일 때 테스트", async () => {
    await inputType("2100", "11", "01", "2101", "02", "15");

    await userEvent.click(await screen.findByTestId("calendar"));

    // 2월
    expect(await screen.findByTestId(`currentMonthDayStyle_15`)).toHaveClass(
      "mr-1 pl-1 rounded-r-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_10`)).toHaveClass(
      BG_COLOR.general04,
    );

    // 1월
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).not.toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).toHaveClass(
      BG_COLOR.general04,
    );

    // 12월
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).not.toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_12`)).toHaveClass(
      BG_COLOR.general04,
    );

    // 11월
    await userEvent.click(await screen.findByTestId("prev_month"));
    expect(await screen.findByTestId(`currentMonthDayStyle_1`)).toHaveClass(
      "ml-1 pr-1 rounded-l-full",
    );
    expect(await screen.findByTestId(`currentMonthDayStyle_13`)).toHaveClass(
      BG_COLOR.general04,
    );
  });

  test("선택된 '일'이 같을 때 테스트", async () => {});
});
