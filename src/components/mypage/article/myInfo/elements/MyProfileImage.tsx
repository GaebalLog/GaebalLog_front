import React from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";

import Label from "@/components/commonUI/Label";
import Button from "@/components/designSystem/Button";
import { userAtom } from "@/hooks/useUserAuth";
import useUpdateProfileImg from "@/hooks/mypageAPI/useUpdateProfileImg";

import default_profile from "../../../../../../public/assets/images/common/default_profile.png";

const MyProfileImage: React.FC = () => {
  const [newProfileImg, setNewProfileImg] = React.useState<string>("");
  const { profileImg } = useRecoilValue(userAtom);

  const { handleUpdateProfileImg, handleRemoveProfileImg } =
    useUpdateProfileImg(setNewProfileImg);

  return (
    <div className="flex flex-col items-center gap-[40px] w-[350px] px-[40px] py-[70px]">
      <div className="relative w-[200px] h-[200px]">
        <Image
          className="rounded-full object-cover"
          src={
            newProfileImg !== "" ? newProfileImg : profileImg ?? default_profile
          }
          fill
          sizes="200px"
          alt="프로필사진"
        />
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="h-full relative">
          <Label htmlFor="profileImg">이미지 수정</Label>
          <div className="absolute w-[120px] h-full -z-10 top-0 left-0 overflow-hidden opacity-0">
            <input
              id="profileImg"
              type="file"
              onChange={handleUpdateProfileImg}
            />
          </div>
        </div>
        <Button
          size="button"
          color="white"
          border
          onClick={handleRemoveProfileImg}
        >
          이미지 제거
        </Button>
      </div>
    </div>
  );
};

export default MyProfileImage;
