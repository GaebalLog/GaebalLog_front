"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR } from "@/config/constants/colors";

import LoadingSpinner from "../UI/status/LoadingSpinner";

const styles = {
  container: `w-[1100px] h-[33%] p-4 ${BG_COLOR.primary} ${BORDER_COLOR.button}`,
  loading: `flex justify-center items-center h-full`,
  title: `text-xl font-bold`,
};

const DiscussionProgress: React.FC<{ chatRoomId: number }> = ({
  chatRoomId,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["discussionProgress", chatRoomId],
    queryFn: () => axios.get(`/api/discussionprogress/${chatRoomId}`),
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>토의 진행 현황</h2>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className="no-tailwind mt-10"
          dangerouslySetInnerHTML={{ __html: data?.data }}
        />
      )}
    </section>
  );
};

export default DiscussionProgress;
