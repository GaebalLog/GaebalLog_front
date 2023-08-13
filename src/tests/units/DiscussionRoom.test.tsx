import React from "react";
import { render, screen } from "@testing-library/react";

import ChatRoompage from "@/app/discussion/[id]/page";
import RootLayout from "@/app/layout";

test("토의 방 렌더링 테스트", async () => {
  render(<ChatRoompage />, { wrapper: RootLayout });

  expect(await screen.findByAltText("썸네일")).toBeInTheDocument();
  expect(await screen.findByText("토의 진행 현황")).toBeInTheDocument();
  expect(
    await screen.findByRole("button", { name: "전송" }),
  ).toBeInTheDocument();
});
