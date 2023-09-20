import type React from "react";
import { useSetRecoilState } from "recoil";

import { mypageAPI } from "@/api/mypageAPI";

import { userAtom } from "../useUserAuth";

const useUpdateProfileImg = (
  setNewProfileImg: React.Dispatch<React.SetStateAction<string>>,
) => {
  const setUser = useSetRecoilState(userAtom);

  const handleUpdateProfileImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imgSrc = e.target.files && e.target.files[0];
    if (!imgSrc) return;
    const reader = new FileReader();
    reader.readAsDataURL(imgSrc);
    uploadProfileImage(imgSrc, reader);
  };

  const handleRemoveProfileImg = () => {
    setUser((prev) => ({
      ...prev,
      profileImg: "/assets/images/common/default_profile.png",
    }));
  };

  const uploadProfileImage = (imgSrc: File, reader: FileReader) => {
    reader.onloadend = async () => {
      setNewProfileImg(reader.result as string);
      const formData = new FormData();
      formData.append("image", imgSrc);
      try {
        await mypageAPI.updateProfileImg(formData);
        setUser((prev) => ({ ...prev, profileImg: reader.result as string }));
        alert("프로필 이미지 수정 성공");
      } catch (error) {
        console.log("프로필 이미지 수정 오류 ::", error);
        alert("프로필 이미지 수정 실패");
      }
    };
  };

  return { handleUpdateProfileImg, handleRemoveProfileImg };
};

export default useUpdateProfileImg;
