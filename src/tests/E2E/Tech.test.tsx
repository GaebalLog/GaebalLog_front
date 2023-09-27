import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TechPage from "@/app/tech/page";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";

import "../__mocks__/IntersectionObserverMock";
import { mockNavigation } from "../__mocks__/next/navigation";

import { renderHome } from "./Home.test";

const renderTech = {
  loggedOut: () => {
    renderLoggedOutLayout(<TechPage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<TechPage />, { withHeader: true });
  },
};

describe("테크 화면 테스트", () => {
  test("테크 화면으로 진입", async () => {
    renderHome.loggedOut();
    const mainImage = await screen.findByText(`console.log("Hello, world!");`);
    expect(mainImage).toBeInTheDocument();

    const techButton = screen.getByText("Tech");
    await userEvent.click(techButton);

    expect(mockNavigation).toHaveBeenCalledWith("/tech");
  });

  test("Create Article 버튼 클릭 후 글 작성 페이지 이동", async () => {
    renderTech.loggedIn();
    const createArticleBtn = await screen.findByRole("button", {
      name: "+ Create Article",
    });
    await userEvent.click(createArticleBtn);
    expect(mockNavigation).toHaveBeenCalledWith("/tech/create");
  });

  test("Edit 버튼 클릭 후 검색 모달 생성", async () => {
    renderTech.loggedIn();
    const editBtn = await screen.findByRole("button", { name: "+ Edit" });
    await userEvent.click(editBtn);
    const cancelBtn = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeInTheDocument();
    await userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("글 리스트 클릭시 페이지 이동", async () => {
    renderTech.loggedIn();
    const techArticle = await screen.findByTestId("tech30");
    await userEvent.click(techArticle);
    expect(mockNavigation).toHaveBeenCalledWith("/tech/30");
  });

  test("최신 순 클릭시 최신 순으로 정렬된 글 리스트 출력", async () => {
    renderTech.loggedOut();
    const sortBtn = await screen.findByRole("button", { name: "최신 순" });
    await userEvent.click(sortBtn);
    expect(await screen.findByTestId("tech40")).toBeInTheDocument();
  });
});
