import { atom, useSetRecoilState } from "recoil";

interface User {
  nickname: string | null;
  profileImg: string | null;
}

interface setUserInfoParameter {
  nickname: string;
  imageUrl: string;
}

export const isLoggedInAtom = atom<boolean | null>({
  key: "isLoggedIn",
  default: null,
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
  const setUser = useSetRecoilState(userAtom);

  const setUserInfo = ({ nickname, imageUrl }: setUserInfoParameter) => {
    setUser({ nickname, profileImg: imageUrl });
    setisLoggedIn(true);
  };

  const logout = () => {
    setUser({ nickname: "", profileImg: "" });
    setisLoggedIn(false);
  };

  return { setUserInfo, logout };
};

export default useUserAuth;
