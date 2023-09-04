"use client";

import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/hooks/useUserAuth";

const ProfileSidebar = () => {
  const { nickname, profileImg } = useRecoilValue(userAtom);

  return (
    <div className="flex flex-col items-center gap-[32px] py-[57px] pr-[76px]">
      <Image
        src={profileImg}
        alt="프로필 사진"
        width={200}
        height={200}
        className="h-[200px] !important rounded-full"
        layout="fixed"
        objectFit="cover"
      />
      <span className="text-[24px] font-bold">{nickname}</span>
    </div>
  );
};

export default ProfileSidebar;
