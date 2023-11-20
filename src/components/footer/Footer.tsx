import React from "react";
import Image from "next/image";

import { BORDER_COLOR } from "@/config/constants/colors";

import logo from "../../../public/assets/images/home/logo.png";

const Footer = () => {
  return (
    <div className="flex justify-center w-full h-[351px]">
      <div className={`w-[815px] py-[40px] pl-[74px]`}>
        <div className={`h-[216px] ${BORDER_COLOR.containerRight}`}>
          <Image src={logo} width={100} height={100} alt="로고" />
          <p className="mt-[9px]">
            개발로그는 개발자들을 위한 커리어 성장 서비스입니다.
          </p>
          <p>
            -토의에 참여하여 관심있는 키워드에 대해 다양한 사람들과 대화를 나눌
            수 있습니다.
          </p>
          <p>-나만의 기술 블로그를 설계하며 블로깅을 할 수 있습니다.</p>
        </div>
      </div>
      <div className="flex items-center gap-[140px] w-[815px]  pl-[74px]">
        <div className="flex flex-col justify-start gap-[22px] h-[216px]">
          <h1 className="text-[20px] font-bold">Development</h1>
          <p>Frontend Dev. (최지현, 정호영)</p>
          <p>Backend Dev. (정지용, 서채영)</p>
        </div>
        <div className="flex flex-col justify-start gap-[22px] h-[216px]">
          <h1 className="text-[20px] font-bold">Product manager/Design</h1>
          <p>Product Design. (허 연)</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
