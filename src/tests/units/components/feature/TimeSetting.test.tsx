import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useInput from "@/hooks/useInput";
import Provider from "@/components/provider/Provider";
import TimeSetting from "@/components/post/discussionTimeSetting/TimeSetting";
import HalfDayInput from "@/components/post/discussionTimeSetting/inputs/HalfDayInput";
import HourMinutesInput from "@/components/post/discussionTimeSetting/inputs/HourMinutesInput";
import YearMonthDayInput from "@/components/post/discussionTimeSetting/inputs/YearMonthDayInput";

describe("토의 시간 설정 테스트", () => {
  const TestComponent: React.FC<{
    type: "halfDay" | "hour" | "minutes" | "year" | "month" | "days";
    initialState: string | number;
  }> = ({ type, initialState }) => {
    const inputValue = useInput(initialState);

    let Component;

    switch (type) {
      case "halfDay":
        Component = <HalfDayInput {...inputValue} />;
        break;
      case "hour":
      case "minutes":
        Component = <HourMinutesInput type={type} {...inputValue} />;
        break;
      case "year":
      case "month":
      case "days":
      default:
        Component = <YearMonthDayInput type={type} {...inputValue} />;
        break;
    }

    return Component;
  };

  test("업/다운 버튼으로 '오전, 오후' 잘 바뀌는지 테스트", async () => {
    render(<TestComponent type="halfDay" initialState="오전" />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("halfDay_up"));
    expect(await screen.findByDisplayValue("오후")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("halfDay_down"));
    expect(await screen.findByDisplayValue("오전")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '시간' 잘 바뀌는지 테스트", async () => {
    render(<TestComponent type="hour" initialState={12} />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("hour_up"));
    expect(await screen.findByDisplayValue("01시")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("hour_down"));
    expect(await screen.findByDisplayValue("12시")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '분' 잘 바뀌는지 테스트", async () => {
    render(<TestComponent type="minutes" initialState={0} />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("minutes_down"));
    expect(await screen.findByDisplayValue("59분")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("minutes_up"));
    expect(await screen.findByDisplayValue("00분")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '년' 잘 바뀌는지 테스트", async () => {
    const currenYear = new Date().getFullYear();
    render(<TestComponent type="year" initialState={currenYear} />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("year_down"));
    expect(
      await screen.findByDisplayValue(`${currenYear}년`),
    ).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("year_up"));
    expect(
      await screen.findByDisplayValue(`${currenYear + 1}년`),
    ).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '월' 잘 바뀌는지 테스트", async () => {
    render(<TestComponent type="month" initialState={12} />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("month_up"));
    expect(await screen.findByDisplayValue("01월")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("month_down"));
    expect(await screen.findByDisplayValue("12월")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '일' 잘 바뀌는지 테스트", async () => {
    render(<TestComponent type="days" initialState={1} />, {
      wrapper: Provider,
    });

    await userEvent.click(await screen.findByTestId("days_up"));
    expect(await screen.findByDisplayValue("02일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("days_down"));
    expect(await screen.findByDisplayValue("01일")).toBeInTheDocument();
  });

  test("수동으로 인풋값 바꿨을 때 두 자리 숫자까지만 입력돼야 함", async () => {
    render(<TestComponent type="hour" initialState={12} />, {
      wrapper: Provider,
    });

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.type(input, "11");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "111");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
  });

  test("년도 인풋 값의 길이가 4보다 작거나 현재 년도보다 작으면 현재 년도가 되어야 함", async () => {
    const currenYear = new Date().getFullYear();
    render(
      <>
        <TestComponent type="year" initialState={currenYear} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.type(input, `${currenYear - 1}`);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(
      await screen.findByDisplayValue(`${currenYear}년`),
    ).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "202");
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(
      await screen.findByDisplayValue(`${currenYear}년`),
    ).toBeInTheDocument();
  });

  test("시간 인풋에 아무것도 입력 안 하고 넘어가면 '12'가 되어야 함", async () => {
    render(
      <>
        <TestComponent type="hour" initialState={"01"} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("12시")).toBeInTheDocument();
  });

  test("분 인풋에 아무것도 입력 안 하고 넘어가면 '00'가 되어야 함", async () => {
    render(
      <>
        <TestComponent type="minutes" initialState={"01"} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("00분")).toBeInTheDocument();
  });

  test("그 외 인풋에 아무것도 입력 안 하고 넘어가면 '01'이 되어야 함", async () => {
    render(
      <>
        <TestComponent type="month" initialState={12} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("01월")).toBeInTheDocument();
  });

  describe("년도, 월 인풋 변경 시 일이 자동으로 바뀌어야 함", () => {
    let yearInput: Promise<HTMLElement>,
      monthInput: Promise<HTMLElement>,
      dayInput: Promise<HTMLElement>;

    beforeEach(async () => {
      render(<TimeSetting setTimeSetting={jest.fn} />, { wrapper: Provider });
      await userEvent.click(await screen.findByText("토의 시간 설정"));
      yearInput = screen.findByTestId(`startyear_input`);
      monthInput = screen.findByTestId(`startmonth_input`);
      dayInput = screen.findByTestId(`startdays_input`);
    });

    // 2112년 02월 29일로 세팅
    const setDefaultDateSetting = async (
      year: string,
      month: string,
      day: string,
    ) => {
      await userEvent.clear(await yearInput);
      await userEvent.type(await yearInput, year);
      await userEvent.clear(await monthInput);
      await userEvent.type(await monthInput, month);
      await userEvent.clear(await dayInput);
      await userEvent.type(await dayInput, day);
    };

    test("년도 증감 버튼을 눌러서 2112년에서 1년 내리면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2112", "02", "29");
      expect(await screen.findByDisplayValue("29일")).toBeInTheDocument();
      await userEvent.click(await screen.findByTestId("startyear_down"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("년도를 직접 수정해 2112년에서 2111년으로 바꾸고 다른 곳 클릭하면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2112", "02", "29");
      expect(await screen.findByDisplayValue("29일")).toBeInTheDocument();
      await userEvent.clear(await yearInput);
      await userEvent.type(await yearInput, "2111");
      await userEvent.click(await screen.findByText("시작 기간"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("월 증감 버튼을 눌러서 2월로 내리면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2111", "03", "31");
      expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
      await userEvent.click(await screen.findByTestId("startmonth_down"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("월을 직접 수정해 2월로 바꾸고 다른 곳 클릭하면 31일이 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2111", "03", "31");
      expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
      await userEvent.clear(await monthInput);
      await userEvent.type(await monthInput, "02");
      await userEvent.click(await screen.findByText("시작 기간"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });
  });
});
