import React from "react";
import Image from "next/image";

import useIcon from "@/hooks/useIcon";
import { TEXT_COLOR } from "@/constants/global/colors";

const styles = {
  container: "flex px-[16px] py-[5px] gap-[24px] items-center",
  nickname: `text-[16px] font-bold ${TEXT_COLOR.primary}`,
};

const NeightborProfile: React.FC<neighborItem> = (props) => {
  const { nickname, imageUrl, userId } = props;
  const { getIcon } = useIcon();
  const defaultrofile = getIcon("default_profile", 40, 40);
  return (
    <div id={userId.toString()} className={styles.container}>
      {imageUrl ? (
        <Image src={imageUrl} alt={nickname} width={40} height={40} />
      ) : (
        defaultrofile
      )}
      <span className={styles.nickname}>{nickname}</span>
    </div>
  );
};

export default NeightborProfile;
