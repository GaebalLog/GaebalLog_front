import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import Loginpage from "@/app/auth/login/page";
import SnsLogin from "@/app/auth/callback/[snsType]/page";
import Provider from "@/components/provider/Provider";
import HomePage from "@/app/home/page";
import {
  githubKEY,
  googleKEY,
  googleRedirectURL,
  kakaoKEY,
  kakaoRedirectURL,
} from "@/config/env_config";

import { mockNavigation } from "../__mocks__/next/navigation";
import { server } from "../msw/server";

import { renderHome } from "./Home.test";
describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    render(<Loginpage />, { wrapper: Provider });
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
      expect(mockNavigation).toBeCalledTimes(1);
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
    ).toHaveClass("text-[#FF0000]");
  });
});

describe("헤더 경로 이동 테스트", () => {
  test("헤더의 로그인 버튼 경로 이동 테스트", async () => {
    renderHome.loggedOut();
    await userEvent.click(
      await screen.findByRole("button", { name: "Sign in" }),
    );
    expect(mockNavigation).toHaveBeenCalledWith("/auth/login");
  });

  test("헤더의 회원가입 버튼 경로 이동 테스트", async () => {
    renderHome.loggedOut();
    await userEvent.click(
      await screen.findByRole("button", { name: "Sign up" }),
    );
    expect(mockNavigation).toHaveBeenCalledWith("/auth/signup");
  });
});

describe("소셜 로그인 테스트", () => {
  const socialLoginTest = async (
    type: "google" | "kakao" | "github",
    oauthURL: string,
  ) => {
    const { unmount: LoginpageUnmount } = render(<Loginpage />, {
      wrapper: Provider,
    });
    await userEvent.click(await screen.findByAltText("google"));
    expect(mockNavigation).toHaveBeenCalledWith(`${oauthURL}`);
    LoginpageUnmount();
    const { unmount: SnsLoginUnmount } = render(
      <SnsLogin params={{ snsType: `${type}` }} />,
      { wrapper: Provider },
    );
    await waitFor(() => {
      expect(mockNavigation).toBeCalledTimes(1);
    });
    SnsLoginUnmount();
    render(<HomePage />, { wrapper: Provider });
    expect(await screen.findByText(/Welcome to/)).toBeInTheDocument();
  };

  test("구글 로그인 테스트", async () => {
    const googleURL =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `redirect_uri=${googleRedirectURL}&` +
      `client_id=${googleKEY}&` +
      `response_type=code&` +
      `scope=${[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" ")}`;
    socialLoginTest("google", googleURL ?? "");
  });

  test("카카오 로그인 테스트", async () => {
    const kakaoURL =
      `https://kauth.kakao.com/oauth/authorize?` +
      `client_id=${kakaoKEY}&` +
      `redirect_uri=${kakaoRedirectURL}&` +
      `response_type=code&`;
    socialLoginTest("kakao", kakaoURL ?? "");
  });

  test("깃허브 로그인 테스트", async () => {
    const githubURL =
      `https://github.com/login/oauth/authorize?` + `client_id=${githubKEY}&`;
    socialLoginTest("github", githubURL ?? "");
  });
});
