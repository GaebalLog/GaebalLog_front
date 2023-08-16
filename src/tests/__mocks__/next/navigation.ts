/**
 *
 * @description
 * 경로 이동 테스트를 위해 useRouter를 모킹했습니다.
 * @example
 * import { mockPush } from "../__mocks__/next/navigation";
 * await userEvent.click(screen.getByText("Tech"));
 * expect(mockPush).toHaveBeenCalledWith("/tech");
 * import { mockPush } from "../__mocks__/next/navigation";
 * mockUsePathname.mockReturnValue('/tech');
 * render(<Header />);
 */

export const mockNavigation = jest.fn();

const useRouter = () => ({
  push: mockNavigation,
  replace: mockNavigation,
});

const usePathname = mockNavigation;

const redirect = mockNavigation;

export { useRouter, usePathname, redirect };
