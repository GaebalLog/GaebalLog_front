import React from "react";
import type { MutableSnapshot } from "recoil";
import { render } from "@testing-library/react";

import Provider from "@/components/provider/Provider";
import { isLoggedInAtom } from "@/constants/global/atoms";

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
export const renderLoggedInLayout = (component: React.JSX.Element) => {
  render(
    <Provider initializeState={mockInitializeState(true)}>
      {component}
    </Provider>,
  );
};
/**
 * 로그인 상태에 따른 레이아웃 렌더링
 * @example
 * renderLoggedInLayout(<HomePage />);
 */
export const renderLoggedOutLayout = (component: React.JSX.Element) => {
  render(
    <Provider initializeState={mockInitializeState(false)}>
      {component}
    </Provider>,
  );
};
