import { instance } from "./api";

export const googleURI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
export const kakaoURI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export const githubURI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

export const authAPI = {
  userAuth: () => {
    return instance.get(`/users/me`);
  },
  withdraw: () => {
    return instance.delete(`/users`);
  },
  logout: () => {
    return instance.get(`/auth/logout`);
  },

  // 로컬
  localSignup: (payload: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    return instance.post("/users", payload);
  },
  localLogin: (payload: { email: string; password: string }) => {
    return instance.post("/auth/login", payload);
  },
  emailConfirm: (email: string) => {
    return instance.get(`/users/email?value=${email}`);
  },
  nicknameConfirm: (nickname: string) => {
    return instance.get(`/users/name?value=${nickname}`);
  },

  // 비밀번호 찾기
  sendEmail: async (email: string) => {
    return await instance.post("/users/password-reset/request", { email });
  },
  checkCode: async (code: string, email: string) => {
    return await instance.post("/users/password-reset/confirm", {
      code,
      email,
    });
  },
  changePassword: async (payload: {
    email: string;
    password: string;
    code: string;
  }) => {
    return await instance.patch("/users/password-reset", payload);
  },

  // 소셜
  googleLogin: (code: string) => {
    return instance.post("/auth/google", { code, uri: googleURI });
  },
  githubLogin: (code: string | null) => {
    return instance.post("/auth/github", { code, uri: githubURI });
  },
  kakaoLogin: (code: string | null) => {
    return instance.post("/auth/kakao", { code, uri: kakaoURI });
  },

  myKeywords: () => {
    return instance.get(`/keywords?type=me`);
  },
  trendKeywords: () => {
    return instance.get(`/keywords`);
  },
  addKeywords: (keyword: string) => {
    return instance.post(`/keywords`, { keyword });
  },
  deleteKeywords: (keyword: string) => {
    return instance.delete(`/keywords`, { data: keyword });
  },
  liveSearchKeyword: (keyword: string) => {
    const encodedKeyword = encodeURIComponent(keyword);
    return instance.get(`/keywords/search/${encodedKeyword}`);
  },

  //유저 상세 페이지
  userProfile: (targetId: string) => {
    return instance.get(`/users/${targetId}`);
  },
  userPost: (targetId: string) => {
    return instance.get(`/post/previews/${targetId}`);
  },
  userDiscussion: (targetId: string) => {
    return instance.get(`/discussions/previews/${targetId}`);
  },
  userKeyword: (targetId: string) => {
    return instance.get(`/keywords/${targetId}`);
  },
};
