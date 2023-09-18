import { atom, useSetRecoilState } from "recoil";

interface setUserInfoParameter {
  nickname: string;
  imageUrl: string;
}

export const isLoggedInAtom = atom<boolean | null>({
  key: "isLoggedIn",
  default: null,
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
  const setUser = useSetRecoilState(userAtom);

  const setUserInfo = (data: setUserInfoParameter) => {
    setUser({ nickname: data.nickname, profileImg: data.imageUrl });
    setisLoggedIn(true);
  };

  return { setUserInfo };
};

export default useUserAuth;
