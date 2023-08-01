"use client";

import React from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";

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
        className="text-white"
        onClick={() => setIsModal((prev) => !prev)}
      >
        edit
      </button>
      {isModal && <KeywordSearch />}
    </div>
  );
};

export default Home;
