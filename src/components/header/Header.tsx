"use client";
import Image from "next/image";
import React from "react";

import Input from "../designSystem/Input";
import logo from "../../../public/assets/home/logo.png";

const Header = () => {
  const [search, setSearch] = React.useState("");
  return (
    <header className="flex justify-center w-full">
      <ul className="flex items-center justify-between w-[1800px] h-[50px] p-[20px]">
        <Image src={logo} width={188} height={28} alt="logo" />
        <nav>
          <ul>
            <li>
              <Input value={search} onChange={setSearch} type="header" />
            </li>
            <li></li>
          </ul>
          <ul></ul>
        </nav>
      </ul>
    </header>
  );
};

export default Header;
