import React from "react";
import { screen } from "@testing-library/react";

import ChatRoompage from "@/app/discussion/[id]/page";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";

export const renderDiscussionRoom = {
  loggedOut: () => {
    renderLoggedOutLayout(<ChatRoompage />, { withHeader: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<ChatRoompage />, { withHeader: true });
  },
};

test("토의 방 렌더링 테스트", async () => {
  renderDiscussionRoom.loggedIn();
  expect(await screen.findByAltText("썸네일")).toBeInTheDocument();
  expect(await screen.findByText("토의 진행 현황")).toBeInTheDocument();
  expect(
    await screen.findByRole("button", { name: "전송" }),
  ).toBeInTheDocument();
});
