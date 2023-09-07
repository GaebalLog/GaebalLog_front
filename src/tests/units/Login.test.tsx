import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import Loginpage from "@/app/auth/login/page";
// import SnsLogin from "@/app/auth/callback/[...snsType]/page";
import Provider from "@/components/provider/Provider";

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
    ).toHaveClass("text-[#FF0000]");
  });

  test("구글 로그인 테스트", async () => {
    //   const googleURL =
    //     `https://accounts.google.com/o/oauth2/v2/auth?` +
    //     `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&` +
    //     `client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&` +
    //     `response_type=code&` +
    //     `scope=${[
    //       "https://www.googleapis.com/auth/userinfo.profile",
    //       "https://www.googleapis.com/auth/userinfo.email",
    //     ].join(" ")}`;
    //   await userEvent.click(await screen.findByAltText("google"));
    //   expect(mockNavigation).toHaveBeenCalledWith(googleURL);
    //   render(<SnsLogin params={{ snsType: "google" }} />);
    //   await waitFor(() => {
    //     expect(mockNavigation).toHaveBeenCalledWith("/home");
    //   });
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
