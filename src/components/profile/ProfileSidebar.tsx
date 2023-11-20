"use client";

import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/config/query_config";
import { authAPI } from "@/config/api/authAPI";

import default_profile from "../../../public/assets/images/common/default_profile.png";

const ProfileSidebar: React.FC<{ params: string }> = ({ params }) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NEIGHBORPROFILE, params],
    queryFn: async () => await authAPI.userProfile(params),
  });
  const userProfile = data?.data;
  console.log();

  return (
    <div className="flex flex-col gap-[32px] py-[80px] pr-[76px]">
      <Image
        src={userProfile?.imageUrl ?? default_profile}
        alt="프로필 사진"
        width={200}
        height={200}
        className="h-[200px] !important rounded-full"
        layout="fixed"
        objectFit="cover"
      />
      <span className="text-[24px] text-center font-bold">
        {userProfile?.nickname}
      </span>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p>나를 추가한 이웃</p>
          <span className="text-[#967AC3]">{userProfile?.counts.follower}</span>
        </div>
        <div className="flex justify-between">
          <p>내가 추가한 이웃</p>
          <span className="text-[#967AC3]">
            {userProfile?.counts.following}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
