import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Postpage from "@/app/post/create/[...type]/page";
import { renderLoggedInLayout } from "@/utils/util-test";

describe("태그 인풋 테스트", () => {
  beforeEach(() => {
    renderLoggedInLayout(<Postpage params={{ type: ["tech"] }} />, {
      withHeader: false,
    });
  });
  const modalText = "해쉬태그 또는 엔터를 입력하여 태그를 등록할 수 있습니다.";
  const tagInputPlaceholder = "태그는 최대 3개까지 입력할 수 있습니다.";

  test("태그 인풋 클릭 시 안내 문구가 뜨고 다른 곳 클릭하면 사라져야 함", async () => {
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
    await userEvent.click(
      await screen.findByPlaceholderText(tagInputPlaceholder),
    );
    expect(await screen.findByText(modalText)).toBeInTheDocument();
    await userEvent.click(
      await screen.findByPlaceholderText("제목을 입력해주세요."),
    );
    expect(screen.queryByText(modalText)).not.toBeInTheDocument();
  });

  test("태그 3개까지만 추가되는지 테스트", async () => {
    const input = await screen.findByPlaceholderText(tagInputPlaceholder);
    await userEvent.type(input, "리액트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#리액트")).toBeInTheDocument();
    await userEvent.type(input, "넥스트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#넥스트")).toBeInTheDocument();
    await userEvent.type(input, "타입스크립트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#타입스크립트")).toBeInTheDocument();
    await userEvent.type(input, "자바스크립트");
    await userEvent.keyboard("{enter}");
    expect(screen.queryByText("#자바스크립트")).not.toBeInTheDocument();
  });

  test("태그 잘 삭제되는지 테스트", async () => {
    const input = await screen.findByPlaceholderText(tagInputPlaceholder);
    await userEvent.type(input, "리액트");
    await userEvent.keyboard("{enter}");
    expect(await screen.findByText("#리액트")).toBeInTheDocument();
    await userEvent.click(await screen.findByAltText("default_close"));
    expect(screen.queryByText("#리액트")).not.toBeInTheDocument();
  });
});
