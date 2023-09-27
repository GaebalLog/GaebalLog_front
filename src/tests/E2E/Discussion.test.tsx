import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DiscussionPage from "@/app/discussion/page";

import { mockNavigation } from "../__mocks__/next/navigation";
import {
  renderLoggedInLayout,
  renderLoggedOutLayout,
} from "../../utils/util-test";

import { renderHome } from "./Home.test";

const renderDiscussion = {
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
    expect(mockNavigation).toHaveBeenCalledWith("/discussion");
  });

  test("Create Discussion 버튼 클릭 후 글 작성 페이지 이동", async () => {
    renderDiscussion.loggedIn();
    const createArticleBtn = await screen.findByRole("button", {
      name: "+ Create Discussion",
    });
    await userEvent.click(createArticleBtn);
    expect(mockNavigation).toHaveBeenCalledWith("/discussion/create");
  });

  test("Edit 버튼 클릭 후 검색 모달 생성", async () => {
    renderDiscussion.loggedIn();
    const editBtn = await screen.findByRole("button", { name: "+ Edit" });
    await userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();
    await userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("글 리스트 클릭시 페이지 이동", async () => {
    renderDiscussion.loggedIn();
    const discussionArticle = await screen.findByTestId("discussion6");
    await userEvent.click(discussionArticle);
    expect(mockNavigation).toHaveBeenCalledWith("/discussion/6");
  });

  test("최신 순 클릭시 최신 순으로 정렬된 글 리스트 출력", async () => {
    renderDiscussion.loggedOut();
    const sortBtn = await screen.findByRole("button", { name: "최신 순" });
    await userEvent.click(sortBtn);
    expect(await screen.findByTestId("discussion10")).toBeInTheDocument();
  });
});
