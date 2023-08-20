import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signuppage from "@/app/auth/signup/page";
import Provider from "@/components/provider/Provider";

import { mockNavigation } from "../__mocks__/next/navigation";

describe("로컬 회원가입 테스트", () => {
  beforeEach(() => {
    render(<Signuppage />, { wrapper: Provider });
  });

  const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

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
    expect(validationText).toHaveClass("text-[#FF0000]");
    await userEvent.type(passwordInput, "6");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 영문이 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "1234567*");
    expect(validationText).toHaveClass("text-[#FF0000]");
    await userEvent.type(passwordInput, "d");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 숫자가 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "abcdefgh*");
    expect(validationText).toHaveClass("text-[#FF0000]");
    await userEvent.type(passwordInput, "1");
    expect(validationText).toHaveClass("text-[#48483F]");
    await userEvent.clear(passwordInput);

    // 특수문자가 포함되어야 하는지 테스트
    await userEvent.type(passwordInput, "a1234567");
    expect(validationText).toHaveClass("text-[#FF0000]");
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
    expect(validationText).toHaveClass("text-[#FF0000]");
    await userEvent.type(passwordConfirm, "a@12345");
    expect(validationText).toHaveClass("text-[#FF0000]");
    await userEvent.type(passwordConfirm, "6");
    expect(validationText).toHaveClass("text-transparent");
  });

  test("조건 만족 못하면 회원가입 안 되어야 함", async () => {
    const emailInput = await screen.findByLabelText<HTMLInputElement>("E-mail");
    const nicknameInput = await screen.findByLabelText<HTMLInputElement>(
      "Nickname",
    );
    const passwordInput = await screen.findByLabelText<HTMLInputElement>(
      "Password",
    );
    const passwordConfirmInput = await screen.findByLabelText<HTMLInputElement>(
      "Confirm Password",
    );
    const checkboxInput = await screen.findByTestId("agree");

    const createAccountButton = await screen.findByText("Create Account");

    // 이미지 누락 및 유효성 통과 안 되는 값들 입력
    await userEvent.type(emailInput, "dddd");
    await userEvent.type(nicknameInput, "dd");
    await userEvent.type(passwordInput, "123456");
    await userEvent.type(passwordConfirmInput, "notmatching");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(1);

    // // 이메일 유효성 통과
    await userEvent.type(emailInput, "@gmail.com");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(2);

    // // 이메일 + 비밀번호 유효성 통과
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "123456!a");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(3);

    // // 이메일 + 비밀번호 + 비밀번호 재확인 유효성 통과
    await userEvent.clear(passwordConfirmInput);
    await userEvent.type(passwordConfirmInput, "123456!a");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(4);

    // // 모든 유효성 통과
    await userEvent.click(checkboxInput);
    await userEvent.click(createAccountButton);
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/home");
    });
  });
});
