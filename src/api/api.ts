import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
  withCredentials: true,
});

export const authAPI = {
  localLogin: async (payload: FormData) => {
    const { data } = await instance.post(
      "/auth/login",
      { payload },
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },
  googleLogin: async (code: string | null) => {
    const { data } = await instance.post("/auth/snslogin", { code });
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
};
