import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "@/components/header/Header";
import Provider from "@/components/provider/Provider";
import HomePage from "@/app/home/page";

import { mockNavigation } from "../__mocks__/next/navigation";

describe("테크 화면 테스트", () => {
  test("테크 화면으로 진입", async () => {
    render(<Header />, { wrapper: Provider });
    render(<HomePage />, { wrapper: Provider });

    const mainImage = screen.getByRole("img", { name: "메인 이미지" });
    expect(mainImage).toBeInTheDocument();

    const techButton = screen.getByText("Tech");
    await userEvent.click(techButton);

    expect(mockNavigation).toHaveBeenCalledWith("/tech");
  });
});
