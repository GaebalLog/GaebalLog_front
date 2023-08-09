import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import RootLayout from "@/app/layout";
import utilDelay from "@/utils/util-delay";
import HomePage from "@/app/home/page";

test("edit 버튼을 누르면 키워드 검색 모달이 열리고 Cancel 버튼을 누르면 닫힌다.", async () => {
  render(<HomePage />, { wrapper: RootLayout });
  await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
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
    render(<HomePage />, { wrapper: RootLayout });
    await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
    await utilDelay(100);
  });

  test("현재 나의 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 9;
    const items = await screen.findAllByTestId(/myCategory/);
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

  test("마이 카테고리 삭제 버튼 눌렀을 때 delete 요청 가는지 테스트", async () => {
    const deleteSpy = jest.spyOn(axios, "delete");
    await userEvent.click(await screen.findByTestId("myCategory_개발자"));
    expect(deleteSpy).toHaveBeenCalled();

    deleteSpy.mockRestore();
  });
});

describe("실시간 검색 기능 테스트", () => {
  beforeEach(async () => {
    render(<HomePage />, { wrapper: RootLayout });
    await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
    await utilDelay(100);
    await userEvent.type(await screen.findByTestId("realTimeInput"), "리액트");
  });

  test("실시간 검색 모달 여닫기 테스트", async () => {
    await userEvent.click(await screen.findByTestId("realTimeInput"));
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Add my keywords"));
    expect(screen.queryByText("리액트네이티브")).not.toBeInTheDocument();
  });

  test("방향키를 사용하여 항목 선택", async () => {
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#FFFFFF]");
    await userEvent.keyboard("{arrowdown}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-gray-200");
    await userEvent.keyboard("{arrowdown}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-[#FFFFFF]");
    expect(await screen.findByTestId("item-1")).toHaveClass("bg-gray-200");
    await userEvent.keyboard("{arrowup}");
    expect(await screen.findByTestId("item-0")).toHaveClass("bg-gray-200");
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
});
