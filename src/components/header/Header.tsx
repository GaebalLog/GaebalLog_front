"use client";
import Image from "next/image";
import React from "react";

import { BORDER_COLOR } from "@/constants/global/colors";

import Input from "../designSystem/Input";
import logo from "../../../public/assets/images/home/logo.png";

import LoggedInBox from "./LoggedInBox";
import NotLoggedInBox from "./NotLoggedInBox";

const styles = {
  innerUl: "flex items-center justify-between gap-[22px]",
};

const Header = () => {
  const [search, setSearch] = React.useState("");
  return (
    <header
      className={`flex justify-center w-full border-b-[3px] ${BORDER_COLOR.primary}`}
    >
      <ul className="flex items-center justify-between w-[1632px] h-[94px] p-[20px] gap-[88px]">
        <Image src={logo} width={188} height={28} alt="logo" />
        <nav className="flex items-center justify-between w-[80%]">
          <ul className={styles.innerUl}>
            <li>
              <Input value={search} onChange={setSearch} type="header" />
            </li>
            <li>
              <Image src={logo} width={48} height={48} alt="음성 검색" />
            </li>
          </ul>
          <ul className={styles.innerUl}>
            <LoggedInBox />
          </ul>
        </nav>
      </ul>
    </header>
  );
};

export default Header;
