import React from "react";
import { screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import Detail from "@/app/tech/[postId]/page";
import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";

const rederDetail = {
  loggedOut: (postId: string) => {
    renderLoggedOutLayout(<Detail params={{ postId }} />, { withHeader: true });
  },
  loggedIn: (postId: string) => {
    renderLoggedInLayout(<Detail params={{ postId }} />, {
      withHeader: true,
    });
  },
};

describe("디테일 페이지 테스트", () => {
  beforeEach(() => {
    rederDetail.loggedIn("37");
  });

  test("서버에서 받아온 본문 렌더링", async () => {
    await waitFor(() => {
      screen.getByText("update4");
    });
  });

  // test("댓글 삭제 기능 테스트", async () => {
  //   const deleteBtn = screen.getByText("글 삭제");
  //   await userEvent.click(deleteBtn);
  //   const confirmBtn = screen.getByText("예");
  //   await userEvent.click(confirmBtn);
  //   expect(window.alert).toBeCalledWith("해당 글이 삭제되었습니다.");
  // });
});

// test("디테일 페이지 댓글 렌더링 테스트", async () => {
//   expect(await screen.findByText("yeon")).toBeInTheDocument();
// });

// test("답글쓰기를 누르면 댓글 작성창이 1개만 렌더링 되어야함. 기본 댓글창까지 최종 2개가 렌더링 되는 것을 확인", async () => {
//   expect(
//     (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//   ).toBe(1);

//   await userEvent.click(await screen.findByTestId("addCommentButton_1"));
//   await userEvent.click(await screen.findByTestId("addCommentButton_2"));

//   expect(
//     (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//   ).toBe(2);

//   await userEvent.click(await screen.findByTestId("addCommentButton_1"));

//   expect(
//     (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//   ).toBe(2);
// });
// });

// describe("삭제된 댓글 렌더링 테스트", () => {
//   test("댓글 삭제됐을 때 테스트", async () => {
//     render(<CommentsList {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<CommentsList {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });

//   test("대댓글 삭제됐을 때 테스트", async () => {
//     render(<ChildComment {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<ChildComment {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });

//   test("대대댓글 삭제됐을 때 테스트", async () => {
//     render(<GrandChildComment {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<GrandChildComment {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });
// });

// test("대대댓글은 답글쓰기가 보이지 않아야 함.", async () => {
//   render(<GrandChildComment {...comment} />, { wrapper: Provider });
//   expect(screen.queryByText("답글쓰기")).not.toBeInTheDocument();
// });
