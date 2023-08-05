import React from "react";
import { render, screen } from "@testing-library/react";

import Detail from "@/app/detail/page";
import RootLayout from "@/app/layout";

describe("디테일 페이지 렌더링 테스트", () => {
  beforeEach(() => {
    render(
      <RootLayout>
        <Detail />
      </RootLayout>,
    );
  });
  test("디테일 페이지 본문 렌더링 테스트", async () => {
    expect(await screen.findByText(/Git 명령어 활용하기/)).toBeInTheDocument();
  });

  test("디테일 페이지 댓글 렌더링 테스트", async () => {
    expect(await screen.findByText("yeon")).toBeInTheDocument();
  });
});
