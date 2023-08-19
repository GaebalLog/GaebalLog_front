import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MY_API,
  withCredentials: true,
});

export const authAPI = {
  localSignup: async (formData: FormData) => {
    const { data } = await instance.post("/users/signup", formData);
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
