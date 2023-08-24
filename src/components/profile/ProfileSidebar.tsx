"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

const ProfileSidebar = () => {
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => await axios.get("/api/users"),
  });
  const userInfo = data?.data as myInfo;
  return (
    <div className="flex flex-col items-center gap-[32px] py-[57px] pr-[76px]">
      <Image
        src={userInfo?.profileImg}
        alt="프로필 사진"
        width={200}
        height={200}
        className="h-[200px] !important rounded-full"
        layout="fixed"
        objectFit="cover"
      />
      <span className="text-[24px] font-bold">{userInfo?.nickname}</span>
    </div>
  );
};

export default ProfileSidebar;
