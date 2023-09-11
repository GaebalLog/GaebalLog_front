import React from "react";
import type { MutableSnapshot } from "recoil";
import { render } from "@testing-library/react";
import { rest } from "msw";

import Provider from "@/components/provider/Provider";
import Header from "@/components/header/Header";
import MyPageCategory from "@/components/mypage/article/MyPageCategory";
import { isLoggedInAtom } from "@/hooks/useUserAuth";
import { server } from "@/tests/msw/server";

const mockInitializeState =
  (isLoggedInValue: boolean) =>
  ({ set }: MutableSnapshot) => {
    set(isLoggedInAtom, isLoggedInValue);
  };

/**
 * 로그인 상태에 따른 레이아웃 렌더링
 * @example
 * renderLoggedInLayout(<HomePage />);
 */
interface option {
  withHeader?: boolean;
  mypage?: boolean;
}
export const renderLoggedInLayout = (
  component: React.JSX.Element,
  option?: option,
) => {
  render(
    <Provider initializeState={mockInitializeState(true)}>
      {(option?.withHeader || option?.mypage) && <Header />}
      {option?.mypage && <MyPageCategory />}
      {component}
    </Provider>,
  );
};
/**
 * 로그인 상태에 따른 레이아웃 렌더링
 * @example
 * renderLoggedInLayout(<HomePage />);
 */
export const renderLoggedOutLayout = (
  component: React.JSX.Element,
  option?: option,
) => {
  server.use(
    rest.get("/users", (req, res, ctx) => {
      return res.once(ctx.status(400));
    }),
  );
  render(
    <Provider initializeState={mockInitializeState(false)}>
      {(option?.withHeader || option?.mypage) && <Header />}
      {option?.mypage && <MyPageCategory />}
      {component}
    </Provider>,
  );
};
