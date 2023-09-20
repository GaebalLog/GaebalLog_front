import { atom, useSetRecoilState } from "recoil";

interface User {
  nickname: string | null;
  profileImg: string | null;
}

interface setUserInfoParameter {
  nickname: string;
  imageUrl: string;
  darkmode: 0 | 1;
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
  }: setUserInfoParameter) => {
    setUser({ nickname, profileImg: imageUrl });
    setisLoggedIn(true);
    setDark(darkmode);
  };

  const logout = () => {
    setUser({ nickname: "", profileImg: "" });
    setisLoggedIn(false);
  };

  return { setUserInfo, logout };
};

export default useUserAuth;
