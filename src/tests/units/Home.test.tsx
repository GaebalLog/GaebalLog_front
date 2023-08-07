import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "@/components/header/Header";
import Provider from "@/components/provider/Provider";
import HomePage from "@/app/home/page";
import HomeSideBar from "@/components/home/HomeSideBar";

describe("홈 화면 테스트", () => {
  test("초기 레이아웃 렌더링", async () => {
    render(<Header />, { wrapper: Provider });

    expect(
      await screen.findByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();

    render(<HomePage />, { wrapper: Provider });
    expect(
      screen.getByRole("img", { name: "메인 이미지" }),
    ).toBeInTheDocument();

    render(<HomeSideBar />, { wrapper: Provider });
    // 모킹서버에서 받아온 데이터를 이용한 테스트 작업
  });
});
