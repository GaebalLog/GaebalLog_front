import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";
import MyPagePage from "@/app/mypage/page";

import { mockNavigation } from "../__mocks__/next/navigation";

const renderMypage = {
  loggedOut: () => {
    renderLoggedOutLayout(<MyPagePage />, { mypage: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<MyPagePage />, { mypage: true });
  },
};

describe("마이페이지 화면 테스트", () => {
  test("비로그인일 경우 접근시 로그인 페이지로 이동", async () => {
    renderMypage.loggedOut();
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/auth/login");
    });
  });
  test("로그인일 경우 접근시 마이페이지 화면 노출", async () => {
    renderMypage.loggedIn();
    expect(screen.getByTestId("renderedMypage")).toBeInTheDocument();
  });
  test("검색창에 내 카테고리를 검색하면 자동추천이 노출된다.", async () => {
    renderMypage.loggedIn();
    const searchInput = screen.getByPlaceholderText(
      "내가 추가한 나만의 키워드를 검색해보세요.",
    );
    await waitFor(() => {
      expect(screen.getByText("# 채팅방입니다1")).toBeInTheDocument();
    });

    await userEvent.type(searchInput, "채팅방");
    screen.getByText("채팅방입니다1");
  });
  test("프로필 이미지 수정기능", async () => {
    renderMypage.loggedIn();

    const file = new File(["testImg"], "testImg.png", {
      type: "image/png",
    });

    const input = screen.getByLabelText("이미지 수정");

    userEvent.upload(input, file);

    await waitFor(() => {
      const imgElement = screen.getByAltText("프로필사진");
      expect(imgElement.getAttribute("src")).toContain(
        "data:image/png;base64,dGVzdEltZw==",
      );
    });
  });
});
