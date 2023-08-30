import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ChatRoompage from "@/app/discussion/[id]/page";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";

import { mockNavigation } from "../__mocks__/next/navigation";

export const renderDiscussionRoom = {
  loggedOut: () => {
    renderLoggedOutLayout(<ChatRoompage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<ChatRoompage />, { withHeader: true });
  },
};

describe("토의방 테스트", () => {
  beforeEach(() => {
    renderDiscussionRoom.loggedIn();
  });

  test("토의 방 렌더링 테스트", async () => {
    expect(await screen.findByAltText("썸네일")).toBeInTheDocument();
    expect(await screen.findByText("토의 진행 현황")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "전송" }),
    ).toBeInTheDocument();
  });

  test("프로필을 누르면 모달이 열리고 다른 곳 누르면 닫혀야 함", async () => {
    await userEvent.click(await screen.findByTestId("profile_1"));
    expect(await screen.findByText("강퇴하기")).toBeInTheDocument();
    await userEvent.click(await screen.findByText("주제"));
    expect(screen.queryByText("강퇴하기")).not.toBeInTheDocument();
  });

  test("더보기 아이콘 누르면 모달이 열리고 다른 곳 누르면 닫혀야 함", async () => {
    await userEvent.click(await screen.findByAltText("more"));
    expect(await screen.findByText("토의 나가기")).toBeInTheDocument();
    await userEvent.click(await screen.findByText("주제"));
    expect(screen.queryByText("토의 나가기")).not.toBeInTheDocument();
  });

  test("수정하기 누르면 글 작성 페이지로 이동해야 함", async () => {
    await userEvent.click(await screen.findByAltText("more"));
    await userEvent.click(await screen.findByText("수정하기"));
    expect(mockNavigation).toHaveBeenCalledWith("/post/create/discussion");
  });
});

describe("토의방 나가기 기능 테스트", () => {
  beforeEach(async () => {
    renderDiscussionRoom.loggedIn();
    await userEvent.click(await screen.findByAltText("more"));
    await userEvent.click(await screen.findByText("토의 나가기"));
  });

  test("토의방 나가기 모달 렌더링 테스트", async () => {
    const modalText = "이 토의에 대한 알림을 받으시겠습니까?";
    expect(await screen.findByText(modalText)).toBeInTheDocument();
    await userEvent.click(await screen.findByAltText("default_close"));
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  });
});
