import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HomePage from "@/app/home/page";

import { mockPush } from "../__mocks__/next/navigation";
import {
  renderLoggedInLayout,
  renderLoggedOutLayout,
} from "../../utils/util-test";

export const renderHome = {
  loggedOut: () => {
    renderLoggedOutLayout(<HomePage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<HomePage />, { withHeader: true });
  },
};

describe("홈 화면 테스트", () => {
  test("비로그인일 경우 초기 레이아웃 렌더링", async () => {
    renderHome.loggedOut();
    expect(await screen.findByTestId("sign-in")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "메인 이미지" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "#test1" }),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("hi")).toHaveLength(3);
  });

  test("로그인일 경우 초기 레이아웃 렌더링", async () => {
    renderHome.loggedIn();
    expect(await screen.findByTestId("logout")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Log out" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "메인 이미지" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "#개발자" }),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("hi")).toHaveLength(3);
  });

  test("Edit 버튼 클릭 후 검색 모달 생성", async () => {
    renderHome.loggedIn();
    const editBtn = await screen.findByRole("button", { name: "+ Edit" });
    await userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();
    await userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("Create Article 버튼 클릭 후 글 작성 페이지 이동", async () => {
    renderHome.loggedIn();
    const createArticleBtn = await screen.findByRole("button", {
      name: "+ Create Article",
    });
    await userEvent.click(createArticleBtn);
    expect(mockPush).toHaveBeenCalledWith("/post/tech");
  });

  test("글 리스트 클릭시 페이지 이동", async () => {
    renderHome.loggedOut();
    const articleList = await screen.findByTestId("post1");
    await userEvent.click(articleList);
    expect(mockPush).toHaveBeenCalledWith("/tech/1");
  });
});
