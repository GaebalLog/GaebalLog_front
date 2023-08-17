import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import Loginpage from "@/app/auth/login/page";
import RootLayout from "@/app/layout";
import SnsLogin from "@/app/auth/callback/[...snsType]/page";

import { mockNavigation } from "../__mocks__/next/navigation";
import { server } from "../msw/server";

describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    render(<Loginpage />, { wrapper: RootLayout });
  });

  test("로그인 페이지 렌더링 테스트", async () => {
    expect(await screen.findByAltText("kakao")).toBeInTheDocument();
    expect(await screen.findByAltText("google")).toBeInTheDocument();
    expect(await screen.findByAltText("github")).toBeInTheDocument();
  });

  test("로그인 성공 테스트", async () => {
    await userEvent.type(await screen.findByLabelText("E-mail"), "dd@asa.com");
    await userEvent.type(await screen.findByLabelText("PASSWORD"), "!1234567a");
    await userEvent.click(
      await screen.findByRole("button", { name: "Log in" }),
    );
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/home");
    });
  });

  test("로그인 실패 테스트", async () => {
    server.use(
      rest.post("/auth/login", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    await userEvent.type(await screen.findByLabelText("E-mail"), "dd@asa.com");
    await userEvent.type(await screen.findByLabelText("PASSWORD"), "!1234567a");
    await userEvent.click(
      await screen.findByRole("button", { name: "Log in" }),
    );
    expect(
      await screen.findByText("아이디 또는 비밀번호를 다시 확인하세요."),
    ).toHaveClass("text-red-500");
  });

  test("구글 로그인 테스트", async () => {
    const googleURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&` +
      `access_type=offline&` +
      `response_type=code&` +
      `prompt=consent&` +
      `scope=${[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" ")}`;

    await userEvent.click(await screen.findByAltText("google"));
    expect(mockNavigation).toHaveBeenCalledWith(googleURL);

    render(<SnsLogin params={{ snsType: "google" }} />);

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/home");
    });
  });
});
