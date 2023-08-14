"use client";
import type { ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import MyPageSideBar from "@/components/mypage/MyPageSideBar";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import Label from "@/components/commonUI/Label";
const boxOption = `${BG_COLOR.general02} ${TEXT_COLOR.primary}`;

const MyPagePage = () => {
  const [profileImg, setProfileImg] = React.useState<string>("");
  const [newProfileImg, setNewProfileImg] = React.useState<string>("");
  const imgRef = React.useRef<HTMLInputElement>(null);

  const onChangeImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgSrc = e.target.files && e.target.files[0];
    if (!imgSrc) return;
    const reader = new FileReader();
    reader.readAsDataURL(imgSrc);
    reader.onloadend = () => {
      setNewProfileImg(reader.result as string);
    };
  };
  const removeImgHandler = () => {
    setNewProfileImg("");
    setProfileImg("");
  };
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => await axios.get("/api/users"),
    onSuccess: (res) => {
      setProfileImg(res.data.profileImg);
    },
  });
  const userInfo = data?.data as myInfo;
  return (
    <div className="w-[1632px] flex justify-between mt-[20px]">
      <MyPageSideBar />
      <div className="flex flex-col gap-[20px]">
        <div className={`flex w-[1200px] h-[416px] ${boxOption}`}>
          <div className="flex flex-col items-center gap-[40px] w-[350px] px-[40px] py-[70px]">
            <Image
              src={newProfileImg !== "" ? newProfileImg : profileImg}
              alt="프로필사진"
              width={200}
              height={200}
              className="h-[200px] !important"
              layout="fixed"
              objectFit="cover"
            />
            <div className="flex items-center gap-[20px]">
              <div className="h-full relative">
                <Label htmlFor="profileImg">이미지 수정</Label>
                <div className="absolute w-[120px] h-full -z-10 top-0 left-0 overflow-hidden opacity-0">
                  <input
                    id="profileImg"
                    type="file"
                    onChange={onChangeImgHandler}
                    ref={imgRef}
                  />
                </div>
              </div>
              <Button
                size="button"
                color="white"
                border
                onClick={removeImgHandler}
              >
                이미지 제거
              </Button>
            </div>
          </div>
          <div>
            <h1>닉네임</h1>
            <div>
              <span>{userInfo?.nickname}</span>
              <button>수정</button>
            </div>
            <div>
              <h1>작성한 글</h1>
              <span>{userInfo?.postsno} 개</span>
            </div>
            <div>
              <h1>참여중인 토의</h1>
              <span>{userInfo?.chatlistno} 개</span>
            </div>
          </div>
        </div>
        <div>
          <div>옵션</div>
          <div>이웃목록</div>
        </div>
      </div>
    </div>
  );
};

export default MyPagePage;
