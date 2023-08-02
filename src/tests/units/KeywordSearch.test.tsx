import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootLayout from "@/app/layout";
import Home from "@/app/page";

test("edit 버튼을 누르면 키워드 검색 모달이 열리고 Cancle 버튼을 누르면 닫힌다.", async () => {
  render(
    <RootLayout>
      <Home />
    </RootLayout>,
  );
  await userEvent.click(screen.getByRole("button", { name: /edit/ }));
  expect(
    await screen.findByRole("button", { name: "Cancle" }),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "Cancle" }));
  expect(
    screen.queryByRole("button", { name: "Cancle" }),
  ).not.toBeInTheDocument();
});

describe("키워드 검색 모달 API 요청 테스트", () => {
  beforeEach(async () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>,
    );
    await userEvent.click(screen.getByRole("button", { name: /edit/ }));
  });

  test("현재 나의 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 14;
    const items = await screen.findAllByTestId(/my_/);
    expect(items.length).toBe(expectedItemCount);
  });

  test("실시간 인기 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 12;
    const items = await screen.findAllByTestId(/trend_/);
    expect(items.length).toBe(expectedItemCount);
  });
});
