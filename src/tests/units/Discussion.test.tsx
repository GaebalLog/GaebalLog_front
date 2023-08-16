import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DiscussionPage from "@/app/discussion/page";

import { mockPush } from "../__mocks__/next/navigation";
import {
  renderLoggedInLayout,
  renderLoggedOutLayout,
} from "../../utils/util-test";

import { renderHome } from "./Home.test";

const rederDiscussion = {
  loggedOut: () => {
    renderLoggedOutLayout(<DiscussionPage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<DiscussionPage />, { withHeader: true });
  },
};

describe("토의목록 페이지 테스트", () => {
  test("토의목록 페이지로 이동", async () => {
    renderHome.loggedOut();

    const discussionBtn = await screen.findByText("Discussions");
    await userEvent.click(discussionBtn);
    expect(mockPush).toHaveBeenCalledWith("/discussion");
  });

  test("Create Article 버튼 클릭 후 글 작성 페이지 이동", async () => {
    rederDiscussion.loggedIn();
    const createArticleBtn = await screen.findByRole("button", {
      name: "+ Create Discussion",
    });
    await userEvent.click(createArticleBtn);
    expect(mockPush).toHaveBeenCalledWith("/post/discussion");
  });

  test("Edit 버튼 클릭 후 검색 모달 생성", async () => {
    rederDiscussion.loggedIn();
    const editBtn = await screen.findByRole("button", { name: "+ Edit" });
    await userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();
    await userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("글 리스트 클릭시 페이지 이동", async () => {
    rederDiscussion.loggedIn();
    const articleList = await screen.findByTestId("discussion1");
    await userEvent.click(articleList);
    expect(mockPush).toHaveBeenCalledWith("/discussion/1");
  });

  test("정렬 방식 클릭시 정렬된 글 리스트 출력", async () => {});
});
