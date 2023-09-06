"use client"; // Error components must be Client Components
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/header/Header";
import Provider from "@/components/provider/Provider";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";

import notFound from "../../public/assets/images/common/not_found.png";

const NotFoundPage = () => {
  return (
    <div className={`${BG_COLOR.primary} ${TEXT_COLOR.primary}`}>
      <Provider>
        <Header />
        <div className="h-[94px]" />
        <div className="flex gap-[45px]">
          <div
            className={`mt-[158px] w-[1000px] h-[600px] ${BG_COLOR.general02} py-[80px] px-[100px]`}
          >
            <div className="text-[40px] font-bold font-hack">404 ERROR</div>
            <ul className="flex flex-col gap-[16px] text-[24px] mt-[80px] mb-[110px]">
              <li>죄송합니다. 페이지를 찾을 수 없습니다.</li>
              <li>존재하지 않는 주소를 입력하셨거나</li>
              <li>요청하신 페이지의 주소가 변경,삭제되어 찾을 수 없습니다.</li>
            </ul>
            <Link href="/">
              <Button size="commentCreate" color="white" border>
                홈으로
              </Button>
            </Link>
          </div>
          <Image src={notFound} alt="not found" className="mt-[260px]" />
        </div>
      </Provider>
    </div>
  );
};
export default NotFoundPage;
