import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderLoggedInLayout, renderLoggedOutLayout } from "@/utils/util-test";
import MyPagePage from "@/app/mypage/page";
import MyPageCategory from "@/components/mypage/article/MyPageCategory";
import Provider from "@/components/provider/Provider";

import { mockNavigation } from "../__mocks__/next/navigation";

const renderMypage = {
  loggedOut: () => {
    renderLoggedOutLayout(<MyPagePage />, { mypage: true });
  },
  loggedIn: () => {
    renderLoggedInLayout(<MyPagePage />, { mypage: true });
  },
};

describe("렌더링 테스트", () => {
  test("비로그인일 경우 접근시 로그인 페이지로 이동", async () => {
    renderMypage.loggedOut();
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith("/auth/login");
    });
  });

  test("로그인일 경우 접근시 마이페이지 화면 노출", async () => {
    renderMypage.loggedIn();
    expect(await screen.findByTestId("renderedMypage")).toBeInTheDocument();
  });
});

test("My Keyword Total time 검색창에 내 카테고리를 검색하면 자동추천이 노출되고 선택하면 리스트가 필터링되어야 함.", async () => {
  render(<MyPageCategory />, { wrapper: Provider });
  const searchInput = await screen.findByPlaceholderText(
    "내가 추가한 나만의 키워드를 검색해보세요.",
  );

  await waitFor(() => {
    expect(screen.getByText("# 리액트")).toBeInTheDocument();
    expect(screen.getByText("# Javascript")).toBeInTheDocument();
  });
  await userEvent.type(searchInput, "Javascript");
  expect(screen.queryByText("리액트")).not.toBeInTheDocument();
  await userEvent.clear(searchInput);
  await userEvent.type(searchInput, "리");
  await userEvent.click(await screen.findByText("리액트"));
  expect(screen.queryByText("# Javascript")).not.toBeInTheDocument();
  expect(await screen.findByText("# 리액트")).toBeInTheDocument();
});

describe("MyInfo 테스트", () => {
  test("프로필 이미지 수정 기능", async () => {
    renderMypage.loggedIn();
    const file = new File(["testImg"], "testImg.png", {
      type: "image/png",
    });
    const updateImgBtn = await screen.findByLabelText("이미지 수정");
    await userEvent.upload(updateImgBtn, file);
    const imgElement = await screen.findByAltText("프로필사진");
    expect(imgElement.getAttribute("src")).toContain(
      "data:image/png;base64,dGVzdEltZw==",
    );
  });

  test("프로필 이미지 제거버튼 클릭시 기본 사진으로 설정", async () => {
    renderMypage.loggedIn();
    const deleteImgBtn = await screen.findByText("이미지 제거");
    await userEvent.click(deleteImgBtn);
    await waitFor(() => {
      const imgElement = screen.getByAltText("프로필사진");
      expect(imgElement.getAttribute("src")).toContain("default_profile.png");
    });
  });

  test("닉네임 수정기능", async () => {
    renderMypage.loggedIn();
    const nicknameInput = await screen.findByTestId("nicknameInput");
    await userEvent.type(nicknameInput, "테스트닉네임");
    await waitFor(() => {
      expect(nicknameInput).toHaveValue("테스트닉네임");
    });

    const updateNicknameBtn = screen.getByText("수정");
    await userEvent.click(updateNicknameBtn);
    expect(
      await screen.findByPlaceholderText("테스트닉네임"),
    ).toBeInTheDocument();
  });

  test("회원탈퇴 버튼클릭시 확인모달이 노출된다.", async () => {
    renderMypage.loggedIn();
  });
});

test("MyWritten 렌더링 및 경로 이동 테스트", async () => {
  renderMypage.loggedIn();
  await userEvent.click(await screen.findByText("내가 쓴 글"));
  expect(await screen.findAllByText("title")).toHaveLength(3);
  await userEvent.click(await screen.findByTestId("post1"));
  expect(mockNavigation).toHaveBeenCalledWith("/tech/1");
});

describe("내가 추가한 이웃 테스트", () => {
  beforeEach(async () => {
    renderMypage.loggedIn();
    await userEvent.click(await screen.findByText("내가 추가한 이웃"));
  });

  test("내가 추가한 이웃 테스트", async () => {
    expect(await screen.findByText("내가 추가한 이웃1")).toBeInTheDocument();
  });

  test("나를 추가한 이웃 테스트", async () => {
    await userEvent.click(await screen.findByTestId("neighborDropDown"));
    await userEvent.click(await screen.findByText("나를 추가한 이웃"));
    expect(await screen.findByText("나를 추가한 이웃1")).toBeInTheDocument();
    expect(screen.queryByText("내가 추가한 이웃1")).not.toBeInTheDocument();
  });

  test("서로 이웃 테스트", async () => {
    await userEvent.click(await screen.findByTestId("neighborDropDown"));
    await userEvent.click(await screen.findByText("서로 이웃"));
    expect(await screen.findByText("서로 이웃1")).toBeInTheDocument();
    expect(screen.queryByText("나를 추가한 이웃1")).not.toBeInTheDocument();
  });

  test("차단한 이웃 테스트", async () => {
    await userEvent.click(await screen.findByTestId("neighborDropDown"));
    await userEvent.click(await screen.findByText("차단한 이웃"));
    expect(await screen.findByText("차단한 이웃1")).toBeInTheDocument();
    expect(screen.queryByText("서로 이웃1")).not.toBeInTheDocument();
  });
});
