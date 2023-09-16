import { renderHook } from "@testing-library/react";

import useValidation from "@/hooks/useValidation";

const validateValue = (emailValue: string, passwordValue: string) => {
  return renderHook(() => {
    const { isEmailValid, isPasswordValid } = useValidation(
      emailValue,
      passwordValue,
    );
    return { isEmailValid, isPasswordValid };
  });
};

test("비밀번호 유효성 검사 테스트", async () => {
  const { result } = validateValue("dd", "password");
  expect(result.current.isEmailValid).toBe(false);
  expect(result.current.isPasswordValid).toBe(false);
});
