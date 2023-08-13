"use client";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/constants/global/atoms";
import useIcon from "@/hooks/useIcon";

import Input from "../designSystem/Input";
import logo from "../../../public/assets/images/home/logo.png";

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
const noHeaderPathList = ["/mypage", "signup", "/auth/login", "/auth/signup"];

const Header = () => {
  const path = usePathname();
  const [search, setSearch] = React.useState("");
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const { getIcon } = useIcon();
  const mike = getIcon("mike", 24, 24);

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
                <Input value={search} onChange={setSearch} type="header" />
              </li>
              <li>{mike}</li>
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
