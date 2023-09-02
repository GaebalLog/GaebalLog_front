import { instance } from "./api";

export const authAPI = {
  localSignup: (payload: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    return instance.post("/users", payload);
  },
  localLogin: (email: string, password: string) => {
    return instance.post("/auth/login", {
      email,
      password,
    });
  },
  googleLogin: (code: string) => {
    return instance.post("/auth/google", { code });
  },
  githubLogin: (code: string | null) => {
    return instance.post("/auth/github", { code });
  },
  kakaoLogin: (code: string | null) => {
    return instance.post("/auth/kakao", { code });
  },
  emailConfirm: (email: string) => {
    return instance.post("/auth/emailCheck", { email });
  },
  nicknameConfirm: (nickname: string) => {
    return instance.post("/auth/nicknameCheck", { nickname });
  },
  isLogin: () => {
    return instance.get("/auth");
  },
};
