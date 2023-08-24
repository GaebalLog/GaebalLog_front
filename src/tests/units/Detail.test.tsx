import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Detail from "@/app/tech/[title]/page";
import CommentsList from "@/components/detail/CommentsList";
import ChildComment from "@/components/detail/comment/ChildComment";
import GrandChildComment from "@/components/detail/comment/GrandChildComment";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";
import Provider from "@/components/provider/Provider";

const createdAt = "2023-08-05T14:00:00Z".toLocaleString();
const comment = {
  commentId: "1",
  nickname: "1yoouoo",
  profileImage: "",
  contents: "정말 유익한 글이었습니다.",
  createdAt,
  isDeleted: false,
  childComments: [],
};
const deletedComment = {
  commentId: "1",
  nickname: "1yoouoo",
  profileImage: "",
  contents: "정말 유익한 글이었습니다.",
  createdAt,
  isDeleted: true,
  childComments: [],
};

const rederDetail = {
  loggedOut: (postId: number) => {
    renderLoggedOutLayout(<Detail params={{ postId }} />, { withHeader: true });
  },
  loggedIn: (postId: number) => {
    renderLoggedInLayout(<Detail params={{ postId }} />, {
      withHeader: true,
    });
  },
};

describe("디테일 페이지 렌더링 테스트", () => {
  beforeEach(() => {
    rederDetail.loggedIn(1);
  });

  test("디테일 페이지 본문 렌더링 테스트", async () => {
    expect(await screen.findByText(/Git 명령어 활용하기/)).toBeInTheDocument();
  });

  test("디테일 페이지 댓글 렌더링 테스트", async () => {
    expect(await screen.findByText("yeon")).toBeInTheDocument();
  });

  test("답글쓰기를 누르면 댓글 작성창이 1개만 렌더링 되어야함. 기본 댓글창까지 최종 2개가 렌더링 되는 것을 확인", async () => {
    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(1);

    await userEvent.click(await screen.findByTestId("addCommentButton_1"));
    await userEvent.click(await screen.findByTestId("addCommentButton_2"));

    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(2);

    await userEvent.click(await screen.findByTestId("addCommentButton_1"));

    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(2);
  });
});

describe("삭제된 댓글 렌더링 테스트", () => {
  test("댓글 삭제됐을 때 테스트", async () => {
    render(<CommentsList {...comment} />, { wrapper: Provider });

    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

    render(<CommentsList {...deletedComment} />, { wrapper: Provider });

    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });

  test("대댓글 삭제됐을 때 테스트", async () => {
    render(<ChildComment {...comment} />, { wrapper: Provider });

    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

    render(<ChildComment {...deletedComment} />, { wrapper: Provider });

    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });

  test("대대댓글 삭제됐을 때 테스트", async () => {
    render(<GrandChildComment {...comment} />, { wrapper: Provider });

    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

    render(<GrandChildComment {...deletedComment} />, { wrapper: Provider });

    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });
});

test("대대댓글은 답글쓰기가 보이지 않아야 함.", async () => {
  render(<GrandChildComment {...comment} />, { wrapper: Provider });
  expect(screen.queryByText("답글쓰기")).not.toBeInTheDocument();
});
