import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TEXT_COLOR } from "@/config/constants/colors";
import ProfileImage from "@/components/designSystem/ProfileImage";
import { mypageApi } from "@/config/api/mypageApi";
import { QUERY_KEYS } from "@/config/query_config";

import Button from "../../../../designSystem/Button";

const styles = {
  container:
    "relative flex px-[16px] w-[500px] py-[5px] gap-[24px] justify-between items-center",
  nickname: `text-[16px] font-bold ${TEXT_COLOR.primary}`,
  profileBox: "flex items-center gap-[24px]",
  btnBox: "absolute right-0 flex items-center gap-[24px]",
};
interface props extends neighborItem {
  bannned: boolean;
}
const NeighborProfile: React.FC<props> = ({
  nickname,
  imageUrl,
  userId,
  bannned,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => mypageApi.deleteBlockUser(userId),
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.NEIGHBOR, "bannedByMe"]);
    },
    onError() {
      alert("차단 해제에 실패했습니다.");
    },
  });
  const btnList = [
    {
      text: "이웃 정보 보기",
      onclick: () => {
        router.push(`/profile/${userId}`);
      },
    },
    {
      text: "이웃 삭제",
      onclick: async () => {
        await mypageApi.deleteNeighbor(userId);
      },
    },
  ];
  const btnBannedList = [
    {
      text: "차단 해제",
      onclick: () => {
        mutate();
      },
    },
  ];

  return (
    <div id={userId.toString()} className={styles.container}>
      <div className={styles.profileBox}>
        <ProfileImage
          idForModal={userId}
          profileImage={imageUrl}
          preventModalOpen
        />
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.btnBox}>
        {!bannned &&
          btnList.map((item) => (
            <Button
              data-testid={`${item.text}${userId}`}
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

export default NeighborProfile;
