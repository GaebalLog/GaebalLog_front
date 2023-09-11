import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/hooks/useUserAuth";

import banner_folder from "../../../public/assets/images/home/banner_folder.png";
import banner_search from "../../../public/assets/images/home/banner_search.png";
import banner_setting from "../../../public/assets/images/home/banner_setting.png";
import banner_downArrow from "../../../public/assets/images/home/banner_downArrow.png";
import banner_TSIcon from "../../../public/assets/images/home/banner_TSIcon.png";
import banner_InfoIcon from "../../../public/assets/images/home/banner_InfoIcon.png";
import banner_JSIcon from "../../../public/assets/images/home/banner_JSIcon.png";
import banner_MDIcon from "../../../public/assets/images/home/banner_MDIcon.png";

const styles = {
  wrapper: `flex w-[1632px] h-[400px] mt-5 mb-[30px] text-white`,
  sidebar: {
    wrapper: `w-[290px] h-full p-4 bg-[#3E3E3E]`,
    editorBox: `flex items-center`,
    circleBox: `flex gap-[7px] mr-5`,
    colorCircle: `w-4 h-4 rounded-full`,
    iconBox: `flex gap-4 mt-[29px] mb-6`,
    gaebalLogBox: `flex items-center gap-[15px] ml-3`,
    verticalLine: `w-[2px] h-[79px] bg-[#585858]`,
    mockFileList: `flex ml-[18.75px]`,
    mockfileDiv: `mt-5 ml-1`,
    mockfile: `flex items-center gap-[6px]`,
  },
  banner: {
    wrapper: `flex flex-col justify-between w-full h-full bg-[#222222]`,
    header: `flex w-full bg-[#191919]`,
    headerIconDiv: `flex p-[10px]`,
    contents: `px-6 flex flex-col gap-[5px] font-hack text-[#7A7A7A]`,
    createDiv: `flex justify-end items-center h-[49px] pr-5 bg-[#2D2D2D] text-2xl text-[#DFAE3D] font-hack`,
  },
};

const contents: { [key: number]: string | undefined } = {
  0: 'console.log("Hello, world!");',
  3: "///On our site, we can discuss development as well as blogging",
  5: "Why don't you share your growth with smart developers?",
};

const contentsArray = Array.from({ length: 10 }).map((_, index) => ({
  number: index + 1,
  content: contents[index] ?? "",
}));

const MainBanner = () => {
  const { nickname } = useRecoilValue(userAtom);

  return (
    <section className={styles.wrapper}>
      <div className={styles.sidebar.wrapper}>
        <div className={styles.sidebar.editorBox}>
          <div className={styles.sidebar.circleBox}>
            <div className={`${styles.sidebar.colorCircle} bg-[#F44336]`} />
            <div className={`${styles.sidebar.colorCircle} bg-[#FFC107]`} />
            <div className={`${styles.sidebar.colorCircle} bg-[#4CAF50]`} />
          </div>
          <span className="font-medium">Editor</span>
        </div>
        <div className={styles.sidebar.iconBox}>
          <Image src={banner_folder} width={20} height={16} alt="폴더" />
          <Image src={banner_search} width={19} height={19} alt="돋보기" />
          <Image src={banner_setting} width={18} height={18} alt="세팅" />
        </div>
        <div className={styles.sidebar.gaebalLogBox}>
          <Image src={banner_downArrow} width={15} height={10} alt="화살표" />
          <span className="font-medium">gaebal.log</span>
        </div>
        <div className={styles.sidebar.mockFileList}>
          <div className={styles.sidebar.verticalLine} />
          <div className={styles.sidebar.mockfileDiv}>
            <div className={styles.sidebar.mockfile}>
              <Image
                src={banner_TSIcon}
                width={16}
                height={16}
                alt="TS아이콘"
              />
              <span>index.js</span>
            </div>
            <div className={styles.sidebar.mockfile}>
              <Image
                src={banner_InfoIcon}
                width={16}
                height={16}
                alt="Info아이콘"
              />
              <span>README.md</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.banner.wrapper}>
        <div className={styles.banner.header}>
          <div className={`${styles.banner.headerIconDiv} bg-[#303030]`}>
            <Image src={banner_JSIcon} width={24} height={24} alt="TS아이콘" />
            <span>index.js</span>
          </div>
          <div className={styles.banner.headerIconDiv}>
            <Image
              src={banner_MDIcon}
              width={24}
              height={24}
              alt="Info아이콘"
            />
            <span>README.md</span>
          </div>
        </div>
        <div className={styles.banner.contents}>
          {contentsArray.map((v, i) => (
            <div key={i}>
              <span className="mr-6">{v.number}</span>
              {i === 1 ? (
                <>
                  <span className="text-[#7ECDF3]">Welcome</span>
                  <span className="text-[#967AC3]"> Developer community</span>
                </>
              ) : (
                <span className={`${i === 0 ? "text-white" : ""}`}>
                  {v.content}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.banner.createDiv}>
          {nickname === "" ? (
            <Link href={"auth/signup"}>{"<Create an Account />"}</Link>
          ) : (
            <span>{`Welcome to ${nickname} 님`}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
