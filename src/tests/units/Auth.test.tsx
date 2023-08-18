import React from "react";
import { render, screen } from "@testing-library/react";

import Loginpage from "@/app/auth/login/page";
import RootLayout from "@/app/layout";

describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    render(<Loginpage />, { wrapper: RootLayout });
  });

  test("로그인 페이지 렌더링 테스트", async () => {
    expect(await screen.findByAltText("kakao")).toBeInTheDocument();
    expect(await screen.findByAltText("google")).toBeInTheDocument();
    expect(await screen.findByAltText("github")).toBeInTheDocument();
  });
});
