import React from "react";
import Image from "next/image";
import Link from "next/link";

import useIcon from "@/hooks/useIcon";
import { TEXT_COLOR } from "@/constants/global/colors";

import Button from "../designSystem/Button";

const styles = {
  container:
    "relative flex px-[16px] w-[800px] py-[5px] gap-[24px] justify-between items-center",
  nickname: `text-[16px] font-bold ${TEXT_COLOR.primary}`,
  profileBox: "flex items-center gap-[24px]",
  btnBox: "absolute right-0 flex items-center gap-[24px]",
};
const btnList = [
  { text: "이웃 글 보기", href: "/" },
  { text: "이웃 참여중인 토의 보기", href: "/" },
  { text: "이웃 삭제", href: "/" },
];
const MyNeightborProfile: React.FC<neighborItem> = (props) => {
  const { nickname, profileImage, userId } = props;
  const { getIcon } = useIcon();
  const defaultrofile = getIcon("default_profile", 40, 40);
  return (
    <div id={userId.toString()} className={styles.container}>
      <div className={styles.profileBox}>
        {profileImage ? (
          <Image src={profileImage} alt={nickname} width={40} height={40} />
        ) : (
          defaultrofile
        )}
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.btnBox}>
        {btnList.map((item) => (
          <Link key={`이웃 ${item.text}`} href={item.href}>
            <Button size="button" color="white">
              {item.text}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyNeightborProfile;
