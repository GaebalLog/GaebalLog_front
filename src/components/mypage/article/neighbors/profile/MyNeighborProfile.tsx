import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { TEXT_COLOR } from "@/constants/global/colors";

import Button from "../../../../designSystem/Button";

const styles = {
  container:
    "relative flex px-[16px] w-[500px] py-[5px] gap-[24px] justify-between items-center",
  nickname: `text-[16px] font-bold ${TEXT_COLOR.primary}`,
  profileBox: "flex items-center gap-[24px]",
  btnBox: "absolute right-0 flex items-center gap-[24px]",
};
interface props extends neighborItem {
  bannned?: boolean;
}
const MyNeightborProfile: React.FC<props> = ({
  nickname,
  profileImage,
  userId,
  bannned,
}) => {
  const router = useRouter();
  const { getIcon } = useIcon();
  const defaultProfile = getIcon("default_profile", 40, 40);
  const btnList = [
    {
      text: "이웃 정보 보기",
      onclick: () => {
        router.push("/");
      },
    },
    {
      text: "이웃 삭제",
      onclick: () => {
        router.push("/");
      },
    },
  ];
  const btnBannedList = [
    {
      text: "차단 해제",
      onclick: () => {
        router.push("/");
      },
    },
  ];

  return (
    <div id={userId.toString()} className={styles.container}>
      <div className={styles.profileBox}>
        {profileImage ? (
          <Image src={profileImage} alt={nickname} width={40} height={40} />
        ) : (
          defaultProfile
        )}
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.btnBox}>
        {!bannned &&
          btnList.map((item) => (
            <Button
              key={`이웃 ${item.text}`}
              size="button"
              color="white"
              onClick={item.onclick}
            >
              {item.text}
            </Button>
          ))}
        {bannned &&
          btnBannedList.map((item) => (
            <Button
              key={`이웃 ${item.text}`}
              size="button"
              color="white"
              onClick={item.onclick}
            >
              {item.text}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default MyNeightborProfile;
