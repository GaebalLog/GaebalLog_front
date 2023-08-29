import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Postpage from "@/app/post/create/[...slug]/page";
import Provider from "@/components/provider/Provider";
import { renderLoggedInLayout } from "@/utils/util-test";
import TimeSetting from "@/components/post/TimeSetting";
import CustomNumberInput from "@/components/post/CustomNumberInput";
import useInput from "@/hooks/useInput";

test("post페이지 렌더링 테스트", async () => {
  const { unmount } = render(<Postpage params={{ slug: ["tech"] }} />, {
    wrapper: Provider,
  });

  expect(screen.queryByText("토의 시간 설정")).not.toBeInTheDocument();

  unmount();
  render(<Postpage params={{ slug: ["discussion"] }} />, { wrapper: Provider });

  expect(await screen.findByText("토의 시간 설정")).toBeInTheDocument();

  expect(
    await screen.findByPlaceholderText("내용을 입력해주세요."),
  ).toBeInTheDocument();
});

test("토의 시간 설정 모달 렌더링 테스트", async () => {
  render(<TimeSetting />, { wrapper: Provider });
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
    renderLoggedInLayout(<Postpage params={{ slug: ["tech"] }} />, {
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
    type: "halfDay" | "hour" | "minutes" | "month" | "days";
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

    const input = await screen.findByTestId("input");

    await userEvent.clear(input);
    await userEvent.type(input, "11");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "111");
    expect(await screen.findByDisplayValue("11시")).toBeInTheDocument();
  });

  test("인풋에 아무것도 입력 안 하고 넘어가면 '01'이 되어야 함", async () => {
    render(
      <>
        <TestComponent type="hour" initialState={12} />
        <div>다른 거 클릭</div>
      </>,
      {
        wrapper: Provider,
      },
    );

    const input = await screen.findByTestId("input");

    await userEvent.clear(input);
    await userEvent.click(await screen.findByText("다른 거 클릭"));
    expect(await screen.findByDisplayValue("01시")).toBeInTheDocument();
  });
});
