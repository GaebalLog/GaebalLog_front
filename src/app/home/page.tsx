import Image from "next/image";
import React from "react";

import HomeSideBar from "@/components/home/HomeSideBar";

const HomePage = () => {
  return (
    <div className="w-[1632px] flex flex-col">
      <Image src={""} width={1632} height={400} alt="메인 이미지" />
      <div>
        <HomeSideBar />
      </div>
    </div>
  );
};

export default HomePage;
