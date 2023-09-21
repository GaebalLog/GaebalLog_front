import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Detail from "@/app/tech/[postId]/page";
import { renderLoggedInLayout } from "@/utils/util-test";

const renderDetail = {
  loggedIn: (postId: string) => {
    renderLoggedInLayout(<Detail params={{ postId }} />, {
      withHeader: true,
    });
  },
};
describe("다른 사람 포스트에 대한 테스트", () => {
  test("다른사람의 글을 보면, 삭제 버튼이 보이지 않아야 함.", async () => {
    renderDetail.loggedIn("29");
    await waitFor(() => {
      screen.getByText("디테일 페이지 제목");
    });
    expect(screen.queryByText("글 수정")).not.toBeInTheDocument();
    expect(screen.queryByText("글 삭제")).not.toBeInTheDocument();
  });
});

describe("내가 작성한 포스트에 대한 테스트", () => {
  beforeEach(() => {
    renderDetail.loggedIn("37");
  });

  test("서버에서 받아온 본문 렌더링", async () => {
    await waitFor(() => {
      screen.getByText("디테일 페이지 제목");
    });
  });
  test("글 삭제 기능 테스트", async () => {
    const deleteBtn = await screen.findByText("글 삭제");
    await userEvent.click(deleteBtn);
    const confirmBtn = screen.getByText("예");
    await userEvent.click(confirmBtn);
    expect(window.alert).toBeCalledWith("해당 글이 삭제되었습니다.");
  });
  test("글 수정 기능 테스트", async () => {
    const editBtn = await screen.findByText("글 수정");
    await userEvent.click(editBtn);
  });
});

describe("댓글 컴포넌트 테스트", () => {
  beforeEach(() => {
    renderDetail.loggedIn("29");
  });

  test("댓글 렌더링 테스트", async () => {
    expect(await screen.findByText("댓글 내용입니다.")).toBeInTheDocument();
  });

  test("댓글 작성 기능 테스트", async () => {
    const input = await screen.findByPlaceholderText("댓글을 입력해주세요.");
    const submitBtn = screen.getByText("작성완료");
    await userEvent.type(input, "댓글 작성 테스트");
    await userEvent.click(submitBtn);
    expect(await screen.findByText("댓글 작성 테스트")).toBeInTheDocument();
  });

  test("댓글에 대한 댓글은 하나의 입력창만을 가져야 한다.", async () => {
    const replyBtn = await screen.findByTestId("addCommentButton_1");
    await userEvent.click(replyBtn);
    expect(
      screen.getAllByPlaceholderText(
        "선택하신 댓글에 대한 댓글을 입력해주세요.",
      ).length,
    ).toBe(1);
    await userEvent.click(await screen.findByTestId("addCommentButton_2"));
    expect(
      screen.getAllByPlaceholderText(
        "선택하신 댓글에 대한 댓글을 입력해주세요.",
      ).length,
    ).toBe(1);
  });

  test("삭제된 댓글(API 응답에 isDeleted가 true인 경우 삭제된 댓글 UI 렌더링", async () => {
    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });
});

describe("댓글 삭제 수정 기능", () => {
  test("내가 작성한 댓글만 삭제, 수정할 수 있다.", async () => {
    renderDetail.loggedIn("29");
    await waitFor(() => {
      screen.getByText("댓글 내용입니다.");
    });
    const deleteBtn = screen.getByText("삭제");
    const updateBtn = screen.getByText("수정");

    await userEvent.click(deleteBtn);
    screen.getByText("댓글을 정말 삭제하겠습니까?");
    const confirmBtn = screen.getByText("예");
    await userEvent.click(confirmBtn);
    expect(confirmBtn).not.toBeInTheDocument();

    await userEvent.click(updateBtn);
    const finishBtn = screen.getByText("완료");
    await userEvent.click(finishBtn);
    await waitFor(() => {
      expect(screen.queryByText("완료")).not.toBeInTheDocument();
    });
  });
});
