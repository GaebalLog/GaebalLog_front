import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Postpage from "@/app/discussion/create/page";
import Provider from "@/components/provider/Provider";
import TimeSetting from "@/components/post/discussionTimeSetting/TimeSetting";

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
  const defaultDate = {
    startDate: "2222-09-27T06:00:03.805Z",
    endDate: "2222-09-27T06:00:03.805Z",
  };

  render(<TimeSetting timeSetting={defaultDate} setTimeSetting={jest.fn()} />, {
    wrapper: Provider,
  });

  await userEvent.click(await screen.findByText("토의 시간 설정"));
  expect(await screen.findByText("시작 시간")).toBeInTheDocument();
  expect(await screen.findByText("종료 시간")).toBeInTheDocument();
  expect(await screen.findByText("시작 기간")).toBeInTheDocument();
  expect(await screen.findByText("종료 기간")).toBeInTheDocument();
  expect(await screen.findAllByDisplayValue(`오후`)).toHaveLength(2);
  expect(await screen.findAllByDisplayValue("03시")).toHaveLength(2);
  expect(await screen.findAllByDisplayValue("00분")).toHaveLength(2);
  expect(await screen.findAllByDisplayValue(/월/)).toHaveLength(2);
  expect(await screen.findAllByDisplayValue(/일/)).toHaveLength(2);
});
