import { instance } from "./api";

export const authAPI = {
  localSignup: async (payload: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    const { data } = await instance.post("/users", payload);
    return data;
  },
  localLogin: async (email: string, password: string) => {
    const { data } = await instance.post("/auth/login", {
      email,
      password,
    });
    return data;
  },
  googleLogin: async (code: string | null) => {
    const { data } = await instance.post("/auth/googlelogin", { code });
    return data;
  },
  emailConfirm: async (email: string) => {
    const { data } = await instance.post("/auth/emailCheck", { email });
    return data;
  },
  nicknameConfirm: async (nickname: string) => {
    const { data } = await instance.post("/auth/nicknameCheck", { nickname });
    return data;
  },
  isLogin: async () => {
    const { data } = await instance.get("/auth");
    return data;
  },
};
