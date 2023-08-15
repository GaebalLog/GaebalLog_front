import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DiscussionPage from "@/app/discussion/page";
import Header from "@/components/header/Header";

import { mockPush } from "../__mocks__/next/navigation";

import { renderLoggedInLayout, renderLoggedOutLayout } from "./Common.test";
import { renderHome } from "./Home.test";

const rederDiscussion = {
  loggedOut: () => {
    renderLoggedOutLayout(
      <>
        <Header />
        <DiscussionPage />
      </>,
    );
  },
  loggedIn: () => {
    renderLoggedInLayout(
      <>
        <Header />
        <DiscussionPage />
      </>,
    );
  },
};

describe("토의목록 페이지 테스트", () => {
  test("토의목록 페이지로 이동", async () => {
    renderHome.loggedOut();

    const discussionBtn = await screen.findByText("Discussions");
    await userEvent.click(discussionBtn);
    expect(mockPush).toHaveBeenCalledWith("/discussion");
  });
});
