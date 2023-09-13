import { renderHook } from "@testing-library/react";

import useValidation from "@/hooks/useValidation";

const testFn = (test: string, type: "email" | "password") => {
  return renderHook(() => {
    const { isPassed } = useValidation(test, type);
    return isPassed;
  });
};

test("비밀번호 유효성 검사 테스트", async () => {
  const { result: dd } = testFn("dd", "password");
  expect(dd.current).toBe(false);
  const { result: sjsjs } = testFn("!sjssjsjjs2212", "password");
  expect(sjsjs.current).toBe(true);
});
