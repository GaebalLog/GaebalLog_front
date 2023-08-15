/**
 *
 * @description
 * 경로 이동 테스트를 위해 useRouter를 모킹했습니다.
 * @example
 * // Test.test.tsx
 *
 * import { mockPush } from "../__mocks__/next/router";
 *
 * // ...
 *
 * await userEvent.click(screen.getByText("Tech"));
 * expect(mockPush).toHaveBeenCalledWith("/tech");
 *
 */

export const mockPush = jest.fn();

const useRouter = () => ({
  push: mockPush,
});
const usePathname = () => "/";

export { useRouter, usePathname };
