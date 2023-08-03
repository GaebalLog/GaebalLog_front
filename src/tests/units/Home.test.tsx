import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "@/components/header/Header";
import Provider from "@/components/provider/Provider";
import HomePage from "@/app/home/page";

describe("홈 화면 테스트", () => {
  test("초기 레이아웃 렌더링", async () => {
    render(<Header />, { wrapper: Provider });

    expect(
      await screen.findByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();

    render(<HomePage />, { wrapper: Provider });
  });
});
