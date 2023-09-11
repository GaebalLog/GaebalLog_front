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
  test("테크 화면에서 무한스크롤로 데이터 불러오기", async () => {
    renderTech.loggedOut();
  });
});
