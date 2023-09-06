import { atom, useSetRecoilState } from "recoil";

interface setUserInfoParameter {
  nickname: string;
  image_url: string;
}

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
  const setUser = useSetRecoilState(userAtom);

  const setUserInfo = (data: setUserInfoParameter) => {
    setUser({ nickname: data.nickname, profileImg: data.image_url });
    setisLoggedIn(true);
  };

  return { setUserInfo };
};

export default useUserAuth;
