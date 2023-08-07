import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Detail from "@/app/detail/[title]/page";
import RootLayout from "@/app/layout";
import CommentsList from "@/components/detail/CommentsList";
import ChildComment from "@/components/detail/comment/ChildComment";
import GrandChildComment from "@/components/detail/comment/GrandChildComment";

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

  test("대댓글이 없다면 댓글쓰기 대신 답글 달기가 보여야 함.", async () => {
    expect(screen.queryByTestId("smallAddComment_1")).not.toBeInTheDocument();
    expect(await screen.findByTestId("bigAddComment_1")).toBeInTheDocument();
    expect(await screen.findByTestId("smallAddComment_2")).toBeInTheDocument();
    expect(screen.queryByTestId("bigAddComment_2")).not.toBeInTheDocument();
  });

  test("답글 달기와 댓글쓰기를 누르면 댓글 작성창이 1개만 렌더링 되어야함. 기본 댓글창까지 최종 2개만 렌더링을 확인", async () => {
    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(1);

    await userEvent.click(await screen.findByTestId("bigAddComment_1"));
    await userEvent.click(await screen.findByTestId("smallAddComment_2"));

    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(2);

    await userEvent.click(await screen.findByTestId("bigAddComment_1"));

    expect(
      (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
    ).toBe(2);
  });
});

//
describe("삭제된 댓글 렌더링 테스트", () => {
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

  test("댓글 삭제됐을 때 테스트", async () => {
    render(
      <RootLayout>
        <CommentsList {...comment} />
      </RootLayout>,
    );
    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();
    render(
      <RootLayout>
        <CommentsList {...deletedComment} />
      </RootLayout>,
    );
    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });

  test("대댓글 삭제됐을 때 테스트", async () => {
    render(
      <RootLayout>
        <ChildComment {...comment} />
      </RootLayout>,
    );
    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();
    render(
      <RootLayout>
        <ChildComment {...deletedComment} />
      </RootLayout>,
    );
    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });

  test("대대댓글 삭제됐을 때 테스트", async () => {
    render(
      <RootLayout>
        <GrandChildComment {...comment} />
      </RootLayout>,
    );
    expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();
    render(
      <RootLayout>
        <GrandChildComment {...deletedComment} />
      </RootLayout>,
    );
    expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
  });
});
