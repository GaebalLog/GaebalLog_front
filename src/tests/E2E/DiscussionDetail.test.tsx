import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DiscussionDetailPage from "@/app/discussion/[discussionId]/page";
import { renderLoggedInLayout } from "@/utils/util-test";

import { mockNavigation } from "../__mocks__/next/navigation";

const renderDetailDiscussion = {
  loggedIn: (discussionId: string) => {
    renderLoggedInLayout(<DiscussionDetailPage params={{ discussionId }} />, {
      withHeader: true,
    });
  },
};

describe("다른 사람 토의글에 대한 테스트", () => {
  beforeEach(() => {
    renderDetailDiscussion.loggedIn("5");
  });

  test("다른사람의 토의 글을 보면, 삭제 버튼이 보이지 않아야 함.", async () => {
    const moreBtn = await screen.findByTestId("moreBtn");
    await userEvent.click(moreBtn);
    expect(
      screen.queryByRole("button", { name: "토의삭제하기" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "수정하기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("토의 나가기")).toBeInTheDocument();
  });
});

describe("내가 쓴 토의글에 대한 테스트", () => {
  beforeEach(() => {
    renderDetailDiscussion.loggedIn("6");
  });
  test("내가 쓴 토의글을 보면, 수정 버튼이 보이고 수정이 가능해야함.", async () => {
    const moreBtn = await screen.findByTestId("moreBtn");
    await userEvent.click(moreBtn);
    const updateBtn = screen.getByRole("button", { name: "수정하기" });
    await userEvent.click(updateBtn);
    expect(mockNavigation).toBeCalledWith("/discussion/update/6");
  });
  test("내가 쓴 토의글을 보면, 삭제 버튼이 보이고 삭제가 가능해야함.", async () => {
    const moreBtn = await screen.findByTestId("moreBtn");
    await userEvent.click(moreBtn);
    const deleteBtn = screen.getByText("토의삭제하기");
    await userEvent.click(deleteBtn);
    expect(window.alert).toBeCalledWith("토의가 삭제되었습니다.");
  });
});
