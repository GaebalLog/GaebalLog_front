import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import KeywordSearch from "@/components/keywordSearch/KeywordSearch";
import Provider from "@/components/provider/Provider";

import { renderHome } from "./Home.test";

test("edit 버튼을 누르면 키워드 검색 모달이 열리고 Cancel 버튼을 누르면 닫힌다.", async () => {
  renderHome.loggedIn();
  await userEvent.click(await screen.findByRole("button", { name: /Edit/ }));
  expect(
    await screen.findByRole("button", { name: "Cancel" }),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(
    screen.queryByRole("button", { name: "Cancel" }),
  ).not.toBeInTheDocument();
});

describe("키워드 검색 모달 API 요청 테스트", () => {
  beforeEach(async () => {
    render(<KeywordSearch />, { wrapper: Provider });
  });

  test("현재 나의 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 9;
    const items = await screen.findAllByTestId(/keywordList/);
    expect(items.length).toBe(expectedItemCount);
  });

  test("실시간 인기 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 12;
    const items = await screen.findAllByTestId(/trendCategory/);
    expect(items.length).toBe(expectedItemCount);
  });

  test("실시간 검색 get 요청 테스트", async () => {
    const input = await screen.findByTestId("realTimeInput");
    expect(input).toBeInTheDocument();
    input.focus();
    expect(screen.queryByText("리액트네이티브")).not.toBeInTheDocument();
    await userEvent.type(input, "리액트");
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
  });
});

describe("실시간 검색 기능 테스트", () => {
  beforeEach(async () => {
    render(<KeywordSearch />, { wrapper: Provider });
    await userEvent.type(await screen.findByTestId("realTimeInput"), "테스트");
  });

  test("실시간 검색 모달 여닫기 테스트", async () => {
    await userEvent.click(await screen.findByPlaceholderText(/키워드/));
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Add my keywords"));
    expect(screen.queryByText("리액트네이티브")).not.toBeInTheDocument();
  });

  test("방향키를 사용하여 항목 선택", async () => {
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#FFFFFF]");
    await userEvent.keyboard("{arrowdown}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#DCDCDC]");
    await userEvent.keyboard("{arrowdown}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#FFFFFF]");
    expect(await screen.findByTestId("item-1")).toHaveClass("bg-[#DCDCDC]");
    await userEvent.keyboard("{arrowup}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#DCDCDC]");
    expect(await screen.findByTestId("item-1")).toHaveClass("bg-[#FFFFFF]");
  });

  test("항목을 고르고 엔터를 누르면 모달이 닫히고 리스트에 항목이 추가 됨", async () => {
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
    expect(await screen.findByText("리액트네이티브 ios")).toBeInTheDocument();
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{enter}");
    waitFor(() => {
      expect(screen.queryByText("리액트네이티브 ios")).not.toBeInTheDocument();
    });
    expect(await screen.findByText("#리액트네이티브")).toBeInTheDocument();
  });

  test("항목 선택 동작은 마우스 호버와 키보드 방향키가 서로 공유해야 함", async () => {
    await userEvent.keyboard("{arrowdown}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#DCDCDC]");

    await userEvent.hover(screen.getByTestId("item-3"));
    expect(await screen.findByTestId("item-3")).toHaveClass("bg-[#DCDCDC]");
    expect(await screen.findByTestId("item-0")).not.toHaveClass("bg-[#DCDCDC]");

    await userEvent.keyboard("{arrowup}");
    expect(await screen.findByTestId("item-2")).toHaveClass("bg-[#DCDCDC]");
    expect(await screen.findByTestId("item-3")).not.toHaveClass("bg-[#DCDCDC]");
  });
});
