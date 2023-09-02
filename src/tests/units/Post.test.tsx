import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Postpage from "@/app/post/create/[...type]/page";
import Provider from "@/components/provider/Provider";
import { renderLoggedInLayout } from "@/utils/util-test";
import TimeSetting from "@/components/post/TimeSetting";
import CustomNumberInput from "@/components/post/CustomNumberInput";
import useInput from "@/hooks/useInput";
import Calendar from "@/components/post/calendar/Calendar";
import { CalendarManager } from "@/utils/util-date";

const today = new Date();
const calendarManager = new CalendarManager(
  today.getFullYear(),
  today.getMonth(),
);

test("post페이지 렌더링 테스트", async () => {
  const { unmount } = render(<Postpage params={{ type: ["tech"] }} />, {
    wrapper: Provider,
  });

  expect(screen.queryByText("토의 시간 설정")).not.toBeInTheDocument();

  unmount();
  render(<Postpage params={{ type: ["discussion"] }} />, { wrapper: Provider });

  expect(await screen.findByText("토의 시간 설정")).toBeInTheDocument();

  expect(
    await screen.findByPlaceholderText("내용을 입력해주세요."),
  ).toBeInTheDocument();
});

test("토의 시간 설정 모달 렌더링 테스트", async () => {
  render(<TimeSetting setTimeSetting={jest.fn} />, { wrapper: Provider });
  await userEvent.click(await screen.findByText("토의 시간 설정"));
  expect(await screen.findByText("시작 시간")).toBeInTheDocument();
  expect(await screen.findByText("종료 시간")).toBeInTheDocument();
  expect(await screen.findByText("기간")).toBeInTheDocument();
  expect(await screen.findAllByDisplayValue("오전")).toHaveLength(2);
  expect(await screen.findAllByDisplayValue("12시")).toHaveLength(2);
  expect(await screen.findAllByDisplayValue("00분")).toHaveLength(2);
  expect(await screen.findByDisplayValue(/월/)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(/일/)).toBeInTheDocument();
});

describe("태그 인풋 테스트", () => {
  beforeEach(() => {
    renderLoggedInLayout(<Postpage params={{ type: ["tech"] }} />, {
      withHeader: false,
    });
  });
  const modalText = "해쉬태그 또는 엔터를 입력하여 태그를 등록할 수 있습니다.";
  const tagInputPlaceholder = "태그는 최대 3개까지 입력할 수 있습니다.";

  test("태그 인풋 클릭 시 안내 문구가 뜨고 다른 곳 클릭하면 사라져야 함", async () => {
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
    await userEvent.click(
      await screen.findByPlaceholderText(tagInputPlaceholder),
    );
    expect(await screen.findByText(modalText)).toBeInTheDocument();
    await userEvent.click(
      await screen.findByPlaceholderText("제목을 입력해주세요."),
    );
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  });

  test("태그 3개까지만 추가되는지 테스트", async () => {
    const input = await screen.findByPlaceholderText(tagInputPlaceholder);
    await userEvent.type(input, "리액트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#리액트")).toBeInTheDocument();
    await userEvent.type(input, "넥스트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#넥스트")).toBeInTheDocument();
    await userEvent.type(input, "타입스크립트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#타입스크립트")).toBeInTheDocument();
    await userEvent.type(input, "자바스크립트");
    await userEvent.keyboard("{enter}");
    expect(screen.queryByText("#자바스크립트")).not.toBeInTheDocument();
  });

  test("태그 잘 삭제되는지 테스트", async () => {
    const input = await screen.findByPlaceholderText(tagInputPlaceholder);
    await userEvent.type(input, "리액트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#리액트")).toBeInTheDocument();
    await userEvent.click(await screen.findByAltText("default_close"));
    expect(screen.queryByText("#리액트")).not.toBeInTheDocument();
  });
});

describe("토의 시간 설정 테스트", () => {
  const TestComponent: React.FC<{
    type: "halfDay" | "hour" | "minutes" | "year" | "month" | "days";
    initialState: string | number;
  }> = ({ type, initialState }) => {
    const startHalfDay = useInput(initialState);
    return <CustomNumberInput type={type} {...startHalfDay} />;
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
    await userEvent.click(await screen.findByTestId("days_down"));
    await userEvent.click(await screen.findByTestId("days_down"));
    await userEvent.click(await screen.findByTestId("days_down"));
    await userEvent.click(await screen.findByTestId("days_down"));
    expect(await screen.findByDisplayValue(/2/)).toBeInTheDocument();
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

  test("그 외 인풋에 아무것도 입력 안 하고 넘어가면 '01'이 되어야 함", async () => {
    render(
      <>
        <TestComponent type="hour" initialState={12} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId(/input/);

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("01시")).toBeInTheDocument();
  });

  describe("년도, 월 인풋 변경 시 일이 자동으로 바뀌어야 함", () => {
    let yearInput: Promise<HTMLElement>,
      monthInput: Promise<HTMLElement>,
      dayInput: Promise<HTMLElement>;

    beforeEach(async () => {
      render(<TimeSetting setTimeSetting={jest.fn} />, { wrapper: Provider });
      await userEvent.click(await screen.findByText("토의 시간 설정"));
      yearInput = screen.findByTestId(`year_input`);
      monthInput = screen.findByTestId(`month_input`);
      dayInput = screen.findByTestId(`days_input`);
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
      await userEvent.click(await screen.findByTestId("year_down"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("년도를 직접 수정해 2112년에서 2111년으로 바꾸고 다른 곳 클릭하면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2112", "02", "29");
      expect(await screen.findByDisplayValue("29일")).toBeInTheDocument();
      await userEvent.clear(await yearInput);
      await userEvent.type(await yearInput, "2111");
      await userEvent.click(await screen.findByText("기간"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("월 증감 버튼을 눌러서 2월로 내리면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2111", "03", "31");
      expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
      await userEvent.click(await screen.findByTestId("month_down"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });

    test("월을 직접 수정해 3월로 바꾸고 다른 곳 클릭하면 28일로 바뀌어야 함", async () => {
      setDefaultDateSetting("2111", "03", "31");
      expect(await screen.findByDisplayValue("31일")).toBeInTheDocument();
      await userEvent.clear(await monthInput);
      await userEvent.type(await monthInput, "02");
      await userEvent.click(await screen.findByText("기간"));
      expect(await screen.findByDisplayValue("28일")).toBeInTheDocument();
    });
  });
});

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
