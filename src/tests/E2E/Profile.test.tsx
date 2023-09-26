import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProfilePage from "@/app/profile/[name]/page";
import Provider from "@/components/provider/Provider";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

import { mockNavigation } from "../__mocks__/next/navigation";

describe("유저 정보 페이지 테스트", () => {
  beforeEach(() => {
    render(
      <div>
        <ProfileSidebar />
        <ProfilePage params={{ name: "1" }} />
      </div>,
      { wrapper: Provider },
    );
  });

  test("Tech탭 테스트", async () => {
    await userEvent.click(await screen.findByText("이웃이 쓴 글"));
    expect(mockNavigation).toHaveBeenCalledWith("/tech/1");
  });

  test("Discussion탭 테스트", async () => {
    await userEvent.click(await screen.findByText("Discussion"));
    await userEvent.click(await screen.findByText("이웃이 쓴 토의1"));
    expect(mockNavigation).toHaveBeenCalledWith("/discussion/1");
  });
});
