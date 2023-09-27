import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Provider from "@/components/provider/Provider";
import HalfDayInput from "@/components/post/discussionTimeSetting/inputs/HalfDayInput";
import TimeSettingProvider from "@/components/provider/TimeSettingProvider";
import HourInput from "@/components/post/discussionTimeSetting/inputs/HourInput";
import MinutesInput from "@/components/post/discussionTimeSetting/inputs/MinutesInput";
import YearInput from "@/components/post/discussionTimeSetting/inputs/YearInput";
import MonthInput from "@/components/post/discussionTimeSetting/inputs/MonthInput";
import DayInput from "@/components/post/discussionTimeSetting/inputs/DayInput";
import TimeSettingManager from "@/utils/util-timeSettingManager";

const date = new TimeSettingManager();
// 2222년 9월 27일 오후 3시
const defaultDate = {
  startDate: "2222-09-27T06:00:03.805Z",
  endDate: "2222-09-27T06:00:03.805Z",
};

const renderWithTimeSettingProvider = (
  children: React.ReactNode,
  timeSetting: { startDate: string; endDate: string } = defaultDate,
) => {
  render(
    <TimeSettingProvider timeSetting={timeSetting} setTimeSetting={jest.fn()}>
      {children}
    </TimeSettingProvider>,
    {
      wrapper: Provider,
    },
  );
};

describe("업/다운 버튼 테스트", () => {
  renderWithTimeSettingProvider(<HalfDayInput time="start" />);
  test("업/다운 버튼으로 '오전, 오후' 잘 바뀌는지 테스트", async () => {
    await userEvent.click(await screen.findByTestId("starthalfDay_up"));
    expect(await screen.findByDisplayValue("오전")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("starthalfDay_down"));
    expect(await screen.findByDisplayValue("오후")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '시간' 잘 바뀌는지 테스트", async () => {
    renderWithTimeSettingProvider(<HourInput time="start" />);
    await userEvent.click(await screen.findByTestId("starthour_up"));
    expect(await screen.findByDisplayValue("04시")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("starthour_down"));
    expect(await screen.findByDisplayValue("03시")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '분' 잘 바뀌는지 테스트", async () => {
    renderWithTimeSettingProvider(<MinutesInput time="start" />);
    await userEvent.click(await screen.findByTestId("startminutes_down"));
    expect(await screen.findByDisplayValue("59분")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startminutes_up"));
    expect(await screen.findByDisplayValue("00분")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '년' 잘 바뀌는지 테스트", async () => {
    renderWithTimeSettingProvider(<YearInput time="start" />);
    await userEvent.click(await screen.findByTestId("startyear_up"));
    expect(await screen.findByDisplayValue(`2223년`)).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startyear_down"));
    expect(await screen.findByDisplayValue(`2222년`)).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '월' 잘 바뀌는지 테스트", async () => {
    renderWithTimeSettingProvider(<MonthInput time="start" />);
    await userEvent.click(await screen.findByTestId("startmonth_up"));
    expect(await screen.findByDisplayValue("10월")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startmonth_down"));
    expect(await screen.findByDisplayValue("09월")).toBeInTheDocument();
  });

  test("업/다운 버튼으로 '일' 잘 바뀌는지 테스트", async () => {
    renderWithTimeSettingProvider(<DayInput time="start" />);
    await userEvent.click(await screen.findByTestId("startday_up"));
    expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startday_down"));
    expect(await screen.findByDisplayValue("27일")).toBeInTheDocument();
  });
});

describe("인풋 수동 입력 테스트", () => {
  test("수동으로 인풋값 바꿨을 때 두 자리 숫자까지만 입력돼야 함", async () => {
    renderWithTimeSettingProvider(<HourInput time="start" />);

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.type(input, "11");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "111");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
  });

  test("'년도' 인풋 값의 길이가 4보다 작거나 현재 년도보다 작으면 '현재 년도'가 되어야 함", async () => {
    renderWithTimeSettingProvider(
      <div>
        <YearInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.type(input, `${date.startDateYear - 1}`);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(
      await screen.findByDisplayValue(`${date.startDateYear}년`),
    ).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, "202");
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(
      await screen.findByDisplayValue(`${date.startDateYear}년`),
    ).toBeInTheDocument();
  });

  test("'시간' 인풋에 아무것도 입력 안 하고 넘어가면 '12'가 되어야 함", async () => {
    renderWithTimeSettingProvider(
      <div>
        <HourInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("12시")).toBeInTheDocument();
  });

  test("'분' 인풋에 아무것도 입력 안 하고 넘어가면 '00'가 되어야 함", async () => {
    renderWithTimeSettingProvider(
      <div>
        <MinutesInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("00분")).toBeInTheDocument();
  });

  test("'월' 인풋에 아무것도 입력 안 하고 넘어가면 '현재 월'이 되어야 함", async () => {
    renderWithTimeSettingProvider(
      <div>
        <MonthInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    const displayValue =
      date.startDateMonth < 10
        ? `0${date.startDateMonth}`
        : date.startDateMonth;
    expect(
      await screen.findByDisplayValue(`${displayValue}월`),
    ).toBeInTheDocument();
  });

  test("'일' 인풋에 아무것도 입력 안 하고 넘어가면 '현재 일'이 되어야 함", async () => {
    renderWithTimeSettingProvider(
      <div>
        <DayInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    const displayValue =
      date.startDateDate < 10 ? `0${date.startDateDate}` : date.startDateDate;
    expect(
      await screen.findByDisplayValue(`${displayValue}일`),
    ).toBeInTheDocument();
  });
});

describe("인풋끼리 시간 연동 테스트", () => {
  test("년도 증감 버튼을 눌러서 2112년에서 1년 내리면 28일로 바뀌어야 함", async () => {
    const Date = {
      startDate: "2112-02-29T06:00:03.805Z",
      endDate: "",
    };

    renderWithTimeSettingProvider(
      <div>
        <YearInput time="start" />
        <MonthInput time="start" />
        <DayInput time="start" />
      </div>,
      Date,
    );
    expect(await screen.findByDisplayValue("29일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startyear_down"));
    expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
  });

  test("년도를 직접 수정해 2112년에서 2111년으로 바꾸고 다른 곳 클릭하면 28일로 바뀌어야 함", async () => {
    const Date = {
      startDate: "2112-02-29T06:00:03.805Z",
      endDate: "",
    };

    renderWithTimeSettingProvider(
      <div>
        <YearInput time="start" />
        <MonthInput time="start" />
        <DayInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
      Date,
    );
    const yearInput = await screen.findByTestId("startyear_input");
    expect(await screen.findByDisplayValue("29일")).toBeInTheDocument();
    await userEvent.clear(yearInput);
    await userEvent.type(yearInput, "2111");
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
  });

  test("월 증감 버튼을 눌러서 2월로 내리면 28일로 바뀌어야 함", async () => {
    const Date = {
      startDate: "2111-03-31T06:00:03.805Z",
      endDate: "",
    };

    renderWithTimeSettingProvider(
      <div>
        <YearInput time="start" />
        <MonthInput time="start" />
        <DayInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
      Date,
    );

    expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId("startmonth_down"));
    expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
  });

  test("월을 직접 수정해 2월로 바꾸고 다른 곳 클릭하면 31일이 28일로 바뀌어야 함", async () => {
    const Date = {
      startDate: "2111-03-31T06:00:03.805Z",
      endDate: "",
    };

    renderWithTimeSettingProvider(
      <div>
        <YearInput time="start" />
        <MonthInput time="start" />
        <DayInput time="start" />
        <div>다른 거 클릭</div>
      </div>,
      Date,
    );

    const monthInput = await screen.findByTestId("startmonth_input");
    expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
    await userEvent.clear(monthInput);
    await userEvent.type(monthInput, "02");
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
  });
});
