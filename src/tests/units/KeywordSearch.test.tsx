import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootLayout from "@/app/layout";
import Home from "@/app/page";

describe("키워드 검색 테스트", () => {
  test("edit 버튼을 누르면 키워드 검색 모달이 열린다.", async () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>,
    );
    await userEvent.click(screen.getByRole("button", { name: /edit/ }));
    expect(await screen.findByText("Add my keywords")).toBeInTheDocument();
  });
});
