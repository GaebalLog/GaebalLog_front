"use client";

import React from "react";
import Link from "next/link";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import useIcon from "@/hooks/useIcon";
import { googleURI, kakaoURI } from "@/api/authAPI";
import useInput from "@/hooks/useInput";
import InputWithLabel from "@/components/auth/input/InputWithLabel";
import Title from "@/components/auth/text/Title";
import ValidationText from "@/components/auth/text/ValidationText";
import useLoginSubmit from "@/hooks/authAPI/useLoginSubmit";

const styles = {
  container: `flex flex-col items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
  loginSection: {
    wrapper: `w-[465px]`,
    form: `flex flex-col gap-[38px]`,
    localSignUp: `flex justify-center gap-11 mt-[18px] pl-[88px]`,
  },
  line: `w-full h-[3px] mt-[57px] mb-[29px] ${BG_COLOR.general03}`,
  social: {
    title: `text-center font-bold leading-none`,
    iconBox: `flex mt-[38px] gap-[112px]`,
  },
};

const googleURL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `redirect_uri=${googleURI}&` +
  `client_id=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&` +
  `response_type=code&` +
  `scope=${[
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" ")}`;
const kakaoURL =
  `https://kauth.kakao.com/oauth/authorize?` +
  `client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&` +
  `redirect_uri=${kakaoURI}&` +
  `response_type=code&`;
const githubURL =
  `https://github.com/login/oauth/authorize?` +
  `client_id=${process.env.NEXT_PUBLIC_GITHUB_API_KEY}&`;

const Loginpage = () => {
  const [isError, setIsError] = React.useState(false);

  const emailInput = useInput();
  const passwordInput = useInput();
  const { getIcon } = useIcon();

  const kakao = getIcon("kakao", 80, 80);
  const google = getIcon("google", 80, 80);
  const github = getIcon("github", 80, 80);

  const { handleLoginSubmit } = useLoginSubmit(
    emailInput.value + "",
    passwordInput.value + "",
    setIsError,
  );

  return (
    <div className={styles.container}>
      <section className={styles.loginSection.wrapper}>
        <Title type="login">Log in</Title>
        <form className={styles.loginSection.form} onSubmit={handleLoginSubmit}>
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
          <ValidationText
            text="아이디 또는 비밀번호를 다시 확인하세요."
            type="default"
            isHighlightColor={isError}
            isLoginPage
          />
          <Button size="bigLogin" color="white">
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
          <div className={`leading-none pl- ${TEXT_COLOR.general03rev}`}>|</div>
          <Link
            href="forgotPassword"
            className={`leading-none ${TEXT_COLOR.general07rev}`}
          >
            Email / 비밀번호 찾기
          </Link>
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
