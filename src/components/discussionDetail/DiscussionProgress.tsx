"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BORDER_COLOR } from "@/constants/global/colors";

import LoadingSpinner from "../LoadingSpinner";

const styles = {
  container: `w-[1100px] h-[33%] p-4 ${BORDER_COLOR.button}`,
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
