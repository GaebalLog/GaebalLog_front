import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootLayout from "@/app/layout";
import Signuppage from "@/app/auth/signup/page";

describe("로컬 회원가입 테스트", () => {
  beforeEach(() => {
    render(<Signuppage />, { wrapper: RootLayout });
  });

  test("회원가입 페이지 렌더링 테스트", async () => {
    expect(await screen.findByText("Create Account")).toBeInTheDocument();
  });

  test("비밀번호 유효성 검사 테스트", async () => {
    const validationText = await screen.findByText(
      "비밀번호는 8~20 자의 영문 소문자 , 숫자 , 특문 사용",
    );
    const passwordInput = await screen.findByLabelText("Password");

    // 길이가 8이어야 하는지 테스트
    await userEvent.type(passwordInput, "!a12345");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordInput, "6");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 영문이 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "1234567*");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordInput, "d");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 숫자가 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "abcdefgh*");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordInput, "1");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 특수문자가 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "a1234567");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordInput, "@");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);
  });

  test("비밀번호 확인 테스트", async () => {
    const validationText = await screen.findByText(
      "비밀번호와 일치시켜주세요.",
    );
    const password = await screen.findByLabelText("Password");
    const passwordConfirm = await screen.findByLabelText("Confirm Password");

    expect(validationText).toHaveClass("text-transparent");
    await userEvent.type(password, "a@123456");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordConfirm, "a@12345");
    expect(validationText).toHaveClass("text-red-500");
    await userEvent.type(passwordConfirm, "6");
    expect(validationText).toHaveClass("text-transparent");
  });

  test("조건 만족 못하면 회원가입 안 되어야 함", async () => {});

  test("Crate Account 버튼 눌렀을 때 성공하면 /auth/login으로 이동", async () => {});
});
