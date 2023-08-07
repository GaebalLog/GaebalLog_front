import React from "react";
import { render, screen } from "@testing-library/react";

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
