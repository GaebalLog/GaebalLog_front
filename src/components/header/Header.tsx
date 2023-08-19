"use client";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

import logo from "../../../public/assets/images/home/logo.png";
import LiveSearchInput from "../commonUI/LiveSearchInput";
import VoiceSearch from "../VoiceSearch";
import Modal from "../modal/Modal";
import { isLoggedInAtom } from "../provider/SettingsProvider";

import LoggedInBox from "./LoggedInBox";
import NotLoggedInBox from "./NotLoggedInBox";

const styles = {
  innerUl: "flex items-center justify-between gap-[22px]",
};
const linkList = [
  { href: "discussion", text: "Discussions" },
  { href: "tech", text: "Tech" },
];

// 헤더가 필요없는 경로 추가
const noHeaderPathList = [
  "/mypage",
  "signup",
  "/auth/login",
  "/auth/signup",
  "/post/tech",
];

const Header = () => {
  const [modal, setModal] = React.useState(false);
  const path = usePathname();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const { getIcon } = useIcon();
  const mike = getIcon("mike", 24, 24);
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
      <ul className="flex items-center justify-between w-[1632px] h-[94px] p-[20px] gap-[88px]">
        <Link href="/home">
          <Image src={logo} width={188} height={28} alt="logo" />
        </Link>
        <nav
          className={`flex items-center ${
            noHeaderPathList.includes(path) ? "justify-end" : "justify-between"
          } w-[80%]`}
        >
          {!noHeaderPathList.includes(path) && (
            <ul className={styles.innerUl}>
              {linkList.map((link) => (
                <Link
                  key={`${link.href}header`}
                  href={`/${link.href}`}
                  className={`${TEXT_COLOR.text} text-[24px] font-bold`}
                >
                  {link.text}
                </Link>
              ))}
              <li>
                <LiveSearchInput
                  type="header"
                  isRouter
                  voiceSearch={voiceSearch}
                />
              </li>
              <li onClick={toggleModal}>{mike}</li>
              {modal && (
                <Modal isBgColor onBackdropClick={toggleModal}>
                  <VoiceSearch closeModal={closeModal} setVoice={setVoice} />
                </Modal>
              )}
            </ul>
          )}
          <ul className={styles.innerUl}>
            {isLoggedIn ? <LoggedInBox /> : <NotLoggedInBox />}
          </ul>
        </nav>
      </ul>
    </header>
  );
};

export default Header;
