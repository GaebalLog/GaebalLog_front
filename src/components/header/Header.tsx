"use client";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import logo from "../../../public/assets/images/home/logo.png";
import LiveSearchInput from "../commonUI/LiveSearchInput";
import VoiceSearch from "../VoiceSearch";
import Modal from "../modal/Modal";
import Toggle from "../designSystem/Toggle";

import LoggedInBox from "./LoggedInBox";
import NotLoggedInBox from "./NotLoggedInBox";

const styles = {
  navUl: "flex items-center justify-between gap-[65px]",
  profileUl: "flex items-center justify-between gap-[30px]",
};
const linkList = [
  { href: "discussion", text: "Discussions" },
  { href: "tech", text: "Tech" },
];

// 헤더가 필요없는 경로 추가
const noHeaderPathList = [
  "/mypage",
  "/auth/login",
  "/auth/signup",
  "/auth/forgotPassword",
  "/post/create/tech",
  "/post/create/discussion",
];

const Header = () => {
  const [modal, setModal] = React.useState(false);
  const path = usePathname();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const { getIcon } = useIcon();
  const mike = getIcon("mike", 48, 48, "cursor hover");
  const [voiceSearch, setVoiceSearch] = React.useState<string | null>(null);
  const setVoice = (value: string) => {
    setVoiceSearch(value);
  };
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <header
      className={`flex justify-center w-full border-b-[3px] ${BORDER_COLOR.primary} ${BG_COLOR.background} fixed top-0 z-10`}
    >
      <ul className="flex items-center justify-between w-[1632px] h-[94px] p-[20px]">
        <Link href="/home" className="flex gap-2 w-auto items-center">
          <Image src={logo} alt="logo" width={80} height={80} />
          <span className="font-hack w-[195px] text-[24px]">
            &lt;gabal.log /&gt;
          </span>
        </Link>
        <nav
          className={`flex items-center ${
            noHeaderPathList.includes(path) ? "justify-end" : "justify-between"
          } w-[80%]`}
        >
          {!noHeaderPathList.includes(path) && (
            <ul className={styles.navUl}>
              {linkList.map((link) => (
                <Link
                  key={`${link.href}header`}
                  href={`/${link.href}`}
                  className={`${TEXT_COLOR.text} ${
                    path === `/${link.href}` && BORDER_COLOR.checkTab
                  } text-[24px] font-bold py-[8px]`}
                >
                  {link.text}
                </Link>
              ))}
              <li className="flex gap-[16px] items-center">
                <LiveSearchInput
                  type="headerSearch"
                  isRouter
                  voiceSearch={voiceSearch}
                />
                <div onClick={toggleModal}>{mike}</div>
              </li>
              {modal && (
                <Modal isBgColor onBackdropClick={toggleModal}>
                  <VoiceSearch closeModal={closeModal} setVoice={setVoice} />
                </Modal>
              )}
            </ul>
          )}
          <ul className={styles.profileUl}>
            <Toggle
              onSuccess={() => console.log("success")}
              onFail={() => console.log("fail")}
              option={{ dark: true }}
            />
            {isLoggedIn ? <LoggedInBox /> : <NotLoggedInBox />}
          </ul>
        </nav>
      </ul>
    </header>
  );
};

export default Header;
