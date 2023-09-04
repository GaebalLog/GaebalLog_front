import { atom, useSetRecoilState } from "recoil";

import { authAPI } from "@/api/authAPI";

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
});

export const userAtom = atom({
  key: "user",
  default: {
    nickname: "",
    profileImg: "",
  },
});

const useUserAuth = () => {
  const setisLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setUserInfo = useSetRecoilState(userAtom);

  const fetchUserAuth = async () => {
    try {
      const { data } = await authAPI.userAuth();
      setUserInfo({ nickname: data.nickname, profileImg: data.image_url });
      setisLoggedIn(true);
    } catch (error) {
      return;
    }
  };
  return { fetchUserAuth };
};

export default useUserAuth;
