"use client";

import type { FormEvent } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import useIcon from "@/hooks/useIcon";
import { authAPI } from "@/api/authAPI";
import useInput from "@/hooks/useInput";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";

const styles = {
  container: `flex flex-col items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
  loginSection: {
    wrapper: `w-[465px]`,
    title: `text-[32px] text-center leading-normal mt-12 mb-[88px] font-hack`,
    form: `flex flex-col gap-[38px]`,
    localSignUp: `flex justify-center gap-11 mt-[18px] pl-9`,
  },
  line: `w-full h-[3px] mt-[57px] mb-[29px] ${BG_COLOR.general03}`,
  social: {
    title: `text-center font-bold leading-none`,
    iconBox: `flex mt-[38px] gap-[112px]`,
  },
};

const googleURL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&` +
  `client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&` +
  `response_type=code&` +
  `scope=${[
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" ")}`;
const kakaoURL =
  `https://kauth.kakao.com/oauth/authorize?` +
  `client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&` +
  `redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&` +
  `response_type=code&`;
const githubURL =
  `https://github.com/login/oauth/authorize?` +
  `client_id=${process.env.NEXT_PUBLIC_GITHUB_API_KEY}&`;

const Loginpage = () => {
  const [isError, setIsError] = React.useState(false);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const router = useRouter();

  const emailInput = useInput();
  const passwordInput = useInput();
  const { getIcon } = useIcon();

  const kakao = getIcon("kakao", 80, 80);
  const google = getIcon("google", 80, 80);
  const github = getIcon("github", 80, 80);

  const LoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.localLogin({
        email: emailInput.value + "",
        password: passwordInput.value + "",
      });
      console.log(data);

      alert("로그인 성공!");
      setIsLoggedIn((prev) => !prev);
      router.replace("/home");
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.loginSection.wrapper}>
        <h1 className={styles.loginSection.title}>Log in</h1>
        <form className={styles.loginSection.form}>
          <InputWithLabel
            label="E-mail"
            type="email"
            value={emailInput.value + ""}
            onChange={emailInput.onChange}
          />
          <InputWithLabel
            label="PASSWORD"
            type="password"
            value={passwordInput.value + ""}
            onChange={passwordInput.onChange}
          />
          <p
            className={`-mt-[30px] -mb-7 select-none ${
              isError ? TEXT_COLOR.error : "text-transparent"
            }`}
          >
            아이디 또는 비밀번호를 다시 확인하세요.
          </p>
          <Button size="bigLogin" color="white" onClick={LoginHandler}>
            Log in
          </Button>
        </form>
        <div className={styles.loginSection.localSignUp}>
          <Link
            href="signup"
            className={`leading-none ${TEXT_COLOR.general07rev}`}
          >
            회원가입
          </Link>
          <div className={`leading-none ${TEXT_COLOR.general03rev}`}>|</div>
          <button className={`leading-none ${TEXT_COLOR.general07rev}`}>
            비밀번호 찾기
          </button>
        </div>
      </section>
      <hr className={styles.line} />
      <section>
        <h4 className={styles.social.title}>간편 로그인</h4>
        <div className={styles.social.iconBox}>
          <Link href={kakaoURL}>{kakao}</Link>
          <Link href={googleURL}>{google}</Link>
          <Link href={githubURL}>{github}</Link>
        </div>
      </section>
    </div>
  );
};

export default Loginpage;
