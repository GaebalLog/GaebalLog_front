"use client";

import React from "react";
import Link from "next/link";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import useIcon from "@/hooks/useIcon";

const styles = {
  container: `flex flex-col items-center w-[800px] h-[800px]`,
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

const Loginpage = () => {
  const { getIcon } = useIcon();
  const kakao = getIcon("kakao", 80, 80);
  const google = getIcon("google", 80, 80);
  const github = getIcon("github", 80, 80);

  return (
    <div className={`${styles.container} ${BG_COLOR.general02}`}>
      <section className={styles.loginSection.wrapper}>
        <h1 className={styles.loginSection.title}>Log in</h1>
        <form className={styles.loginSection.form}>
          <InputWithLabel label="E-mail" />
          <InputWithLabel label="PASSWORD" isPassword />
          <Button size="bigLogin" color="white">
            Log in
          </Button>
        </form>
        <div className={styles.loginSection.localSignUp}>
          <button className={`leading-none ${TEXT_COLOR.general07rev}`}>
            회원가입
          </button>
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
          <Link href={""}>{kakao}</Link>
          <Link href={""}>{google}</Link>
          <Link href={""}>{github}</Link>
        </div>
      </section>
    </div>
  );
};

export default Loginpage;
