import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Postpage from "@/app/post/[...slug]/page";
import Provider from "@/components/provider/Provider";

test("post페이지 렌더링 테스트", async () => {
  const { unmount } = render(<Postpage params={{ slug: ["tech"] }} />, {
    wrapper: Provider,
  });

  expect(screen.queryByText("토의 시간 설정")).not.toBeInTheDocument();

  unmount();
  render(<Postpage params={{ slug: ["discussion"] }} />, { wrapper: Provider });

  expect(screen.getByText("토의 시간 설정")).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText("내용을 입력해주세요."),
  ).toBeInTheDocument();

  const modalText = "해쉬태그 또는 엔터를 입력하여 태그를 등록할 수 있습니다.";
  const placeholder = "태그는 최대 3개까지 입력할 수 있습니다.";

  expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  await userEvent.click(screen.getByPlaceholderText(placeholder));
  expect(screen.getByText(modalText)).toBeInTheDocument();
});
