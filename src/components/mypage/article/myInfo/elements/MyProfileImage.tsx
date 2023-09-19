import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";

import Label from "@/components/commonUI/Label";
import Button from "@/components/designSystem/Button";
import useUpdateProfileImg from "@/hooks/mypageAPI/useUpdateProfileImg";
import { userAtom } from "@/hooks/useUserAuth";

const MyProfileImage: React.FC = () => {
  const [newProfileImg, setNewProfileImg] = React.useState<string>("");
  const { profileImg } = useRecoilValue(userAtom);

  const { handleUpdateProfileImg, handleRemoveProfileImg } =
    useUpdateProfileImg(setNewProfileImg);

  return (
    <div className="flex flex-col items-center gap-[40px] w-[350px] px-[40px] py-[70px]">
      <Image
        src={newProfileImg !== "" ? newProfileImg : profileImg}
        alt="프로필사진"
        width={200}
        height={200}
        className="h-[200px] !important"
      />
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
