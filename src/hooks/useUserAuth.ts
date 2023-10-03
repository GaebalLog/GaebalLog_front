import { atom, useSetRecoilState } from "recoil";

interface User {
  nickname: string | null;
  profileImg: string | null;
  userId: string | null;
}

interface setUserInfoParameter {
  nickname: string;
  imageUrl: string;
  darkmode: 0 | 1;
  userId: string;
}

export const isLoggedInAtom = atom<boolean | null>({
  key: "isLoggedIn",
  default: null,
});

export const darkAtom = atom({
  key: "dark",
  default: 1,
});

export const userAtom = atom<User>({
  key: "user",
  default: {
    nickname: null,
    profileImg: null,
    userId: null,
  },
});

const useUserAuth = () => {
  const setisLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setDark = useSetRecoilState(darkAtom);
  const setUser = useSetRecoilState(userAtom);

  const setUserInfo = ({
    nickname,
    imageUrl,
    darkmode,
    userId,
  }: setUserInfoParameter) => {
    setUser({ nickname, profileImg: imageUrl, userId });
    setisLoggedIn(true);
    setDark(darkmode);
  };

  const logout = () => {
    setUser({ nickname: "", profileImg: "", userId: "" });
    setisLoggedIn(false);
  };

  return { setUserInfo, logout };
};

export default useUserAuth;
