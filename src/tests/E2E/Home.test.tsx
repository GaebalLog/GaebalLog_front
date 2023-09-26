import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import HomePage from "@/app/home/page";
import "../__mocks__/IntersectionObserverMock";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";
import { LoggedSideBar } from "@/components/commonUI/LoggedSideBar";

import { server } from "../msw/server";
import { mockNavigation } from "../__mocks__/next/navigation";

export const renderHome = {
  loggedOut: () => {
    renderLoggedOutLayout(<HomePage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<HomePage />, { withHeader: true });
  },
};

const renderLoggedSideBar = {
  loggedOut: () => {
    renderLoggedOutLayout(<LoggedSideBar type="tech" position="bottom" />);
  },
  loggedIn: () => {
    renderLoggedInLayout(<LoggedSideBar type="tech" position="bottom" />);
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
      await screen.findByText(`console.log("Hello, world!");`),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "#test1" }),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("nickname")).toHaveLength(2);
  });

  test("로그인일 경우 초기 레이아웃 렌더링", async () => {
    renderHome.loggedIn();
    expect(await screen.findByTestId("logout")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Log out" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`console.log("Hello, world!");`),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "#개발자" }),
    ).toBeInTheDocument();
    expect(await screen.findAllByText("nickname")).toHaveLength(2);
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
    expect(mockNavigation).toHaveBeenCalledWith("/tech/create");
  });

  test("글 리스트 클릭시 페이지 이동", async () => {
    renderHome.loggedOut();
    const articleList = await screen.findByTestId("tech30");
    await userEvent.click(articleList);
    expect(mockNavigation).toHaveBeenCalledWith("/tech/30");
  });
});

describe("키워드 목록 컴포넌트 테스트", () => {
  test("키워드가 없을 때 데이터 없음이 떠야 함", async () => {
    server.use(
      rest.get("/keywords", (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      }),
    );
    renderLoggedSideBar.loggedIn();
    expect(await screen.findByText("키워드 없음")).toBeInTheDocument();
  });

  test("마이 키워드 API 테스트", async () => {
    renderLoggedSideBar.loggedIn();
    expect(await screen.findAllByText(/#/)).toHaveLength(9);
  });
});
