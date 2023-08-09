import React from "react";
import { render, screen } from "@testing-library/react";
import type { MutableSnapshot } from "recoil";

import Header from "@/components/header/Header";
import Provider from "@/components/provider/Provider";
import HomePage from "@/app/home/page";
import { isLoggedInAtom } from "@/constants/global/atoms";

describe("홈 화면 테스트", () => {
  test("비로그인일 경우 초기 레이아웃 렌더링", async () => {
    render(<Header />, { wrapper: Provider });
    render(<HomePage />, { wrapper: Provider });

    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "메인 이미지" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "#test1" }),
    ).toBeInTheDocument();

    expect(await screen.findAllByText("hi")).toHaveLength(3);
  });
  test("로그인일 경우 초기 레이아웃 렌더링", async () => {
    const mockInitializeState =
      (isLoggedInValue: boolean) =>
      ({ set }: MutableSnapshot) => {
        set(isLoggedInAtom, isLoggedInValue);
      };
    render(
      <Provider initializeState={mockInitializeState(true)}>
        <Header />
      </Provider>,
    );
    render(
      <Provider initializeState={mockInitializeState(true)}>
        <HomePage />
      </Provider>,
    );

    expect(screen.getByTestId("logout")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Log out" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "메인 이미지" }),
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "#login1" }),
    ).toBeInTheDocument();

    expect(await screen.findAllByText("hi")).toHaveLength(3);
  });
});
