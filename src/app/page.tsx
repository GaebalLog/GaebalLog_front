"use client";

import React from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";
import Link from "next/link";

import { modalAtom } from "@/constants/global/atoms";

// eslint-disable-next-line @typescript-eslint/naming-convention
const KeywordSearch = dynamic(
  () => import("../components/modal/keywordSearch/KeywordSearch"),
);

const Home = () => {
  const [isModal, setIsModal] = useRecoilState<boolean>(modalAtom);
  return (
    <div className="w-full h-screen bg-slate-500">
      <button
        className="block text-white"
        onClick={() => setIsModal((prev) => !prev)}
      >
        edit
      </button>
      <Link className="text-white" href="/detail/안녕하세요" passHref>
        디테일 페이지로 이동
      </Link>
      {isModal && <KeywordSearch />}
    </div>
  );
};

export default Home;
