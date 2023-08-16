/**
 *
 * @description
 * useRouter에서 사용하는 mockPush를 사용해 Link도 자동 모킹되도록 했습니다.
 *
 */

import React from "react";

import { mockNavigation } from "./navigation";

const NextLink: React.FC<{
  children: React.ReactNode;
  href: string;
}> = ({ children, href }) => {
  return <a onClick={() => mockNavigation(href)}>{children}</a>;
};

export default NextLink;
