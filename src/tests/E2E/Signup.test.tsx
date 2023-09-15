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
      "비밀번호는 8~20 자의 영문 소문자, 숫자, 특문 사용",
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

    // 유효성 통과 안 되는 값들 입력
    await userEvent.type(emailInput, "dddd");
    await userEvent.type(nicknameInput, "테스트");
    await userEvent.type(passwordInput, "123456");
    await userEvent.type(passwordConfirmInput, "notmatching");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(1);

    // // 이메일 유효성 통과
    await userEvent.type(emailInput, "@gmail.com");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(2);

    // // + 비밀번호 유효성 통과
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "123456!a");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(3);

    // // + 비밀번호 재확인 유효성 통과
    await userEvent.clear(passwordConfirmInput);
    await userEvent.type(passwordConfirmInput, "123456!a");
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(4);

    // + 이메일 중복 확인 통과
    await userEvent.click(await screen.findByTestId("emailCheck"));
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(5);

    // + 닉네임 중복 확인 통과
    await userEvent.click(await screen.findByTestId("nicknameCheck"));
    await userEvent.click(createAccountButton);
    expect(mockAlert).toBeCalledTimes(6);

    // 모든 유효성 통과
    await userEvent.click(checkboxInput);
    await userEvent.click(createAccountButton);
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/home");
    });
  });
});

describe("중복 확인 테스트", () => {
  let emailInput: Promise<HTMLInputElement>,
    emailCheckButton: Promise<HTMLButtonElement>,
    nicknameInput: Promise<HTMLInputElement>,
    nicknameCheckButton: Promise<HTMLElement>;

  beforeEach(() => {
    render(<Signuppage />, { wrapper: Provider });
    emailInput = screen.findByLabelText("E-mail");
    emailCheckButton = screen.findByTestId("emailCheck");
    nicknameInput = screen.findByLabelText<HTMLInputElement>("Nickname");
    nicknameCheckButton = screen.findByTestId("nicknameCheck");
  });

  test("이메일 중복 확인 api 테스트", async () => {
    const successMsg = "사용 가능한 이메일 입니다.";
    const failMsg = "이미 존재하는 이메일입니다.다른 이메일을 입력해주세요.";
    expect(screen.queryByText(successMsg)).not.toBeInTheDocument();
    await userEvent.type(await emailInput, "dddd@gmail.com");
    await userEvent.click(await emailCheckButton);
    expect(await screen.findByText(successMsg)).toBeInTheDocument();

    await userEvent.clear(await emailInput);
    await userEvent.type(await emailInput, "duplication@gmail.com");
    await userEvent.click(await emailCheckButton);
    expect(await screen.findByText(failMsg)).toBeInTheDocument();
  });

  test("이메일 중복 확인 후 이메일 수정하면 경고 텍스트 바뀌어야함", async () => {
    const successMsg = "사용 가능한 이메일 입니다.";
    await userEvent.type(await emailInput, "dddd@gmail.com");
    await userEvent.click(await emailCheckButton);
    expect(await screen.findByText(successMsg)).toBeInTheDocument();
    await userEvent.type(await emailInput, "11");
    expect(screen.queryByText(successMsg)).not.toBeInTheDocument();
  });

  test("닉네임 중복 확인 api 테스트", async () => {
    const successMsg = "사용 가능한 닉네임 입니다.";
    const failMsg = "이미 존재하는 닉네임입니다.다른 닉네임을 입력해주세요.";
    expect(screen.queryByText(successMsg)).not.toBeInTheDocument();
    await userEvent.type(await nicknameInput, "테스트");
    await userEvent.click(await nicknameCheckButton);
    expect(await screen.findByText(successMsg)).toBeInTheDocument();

    await userEvent.clear(await nicknameInput);
    await userEvent.type(await nicknameInput, "duplication");
    await userEvent.click(await nicknameCheckButton);
    expect(await screen.findByText(failMsg)).toBeInTheDocument();
  });
});
