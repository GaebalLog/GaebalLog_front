"use client";
import Image from "next/image";
import React from "react";

import Input from "../designSystem/Input";
import logo from "../../../public/assets/home/logo.png";

const styles = {
  innerUl: "flex items-center justify-between",
};

const Header = () => {
  const [search, setSearch] = React.useState("");
  return (
    <header className="flex justify-center w-full">
      <ul className="flex items-center justify-between w-[1800px] h-[50px] p-[20px]">
        <Image src={logo} width={188} height={28} alt="logo" />
        <nav className="flex">
          <ul className={styles.innerUl}>
            <li>
              <Input value={search} onChange={setSearch} type="header" />
            </li>
            <li>
              <Image src={logo} width={48} height={48} alt="음성 검색" />
            </li>
          </ul>
          <ul className={styles.innerUl}>
            <li></li>
          </ul>
        </nav>
      </ul>
    </header>
  );
};

export default Header;
