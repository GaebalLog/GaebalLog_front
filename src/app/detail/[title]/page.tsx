"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { server } from "@/tests/msw/server";
import CommentsList from "@/components/detail/CommentsList";
import { BG_COLOR } from "@/constants/global/colors";
import CommentForm from "@/components/detail/form/CommentForm";
import Contents from "@/components/detail/Contents";

const styles = {
  contents: {
    wrapper: `flex flex-col items-center w-[1632px]`,
    inner: `w-[909px] mt-[60px]`,
  },
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  comment: {
    wrapper: `w-full`,
  },
};

const Detail = () => {
  const { data: detailContents } = useQuery({
    queryKey: ["detailContents"],
    queryFn: () => axios.get("/api/detailcontents"),
  });

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: () => axios.get("/api/comments"),
  });

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      server.listen();
      return () => {
        server.close();
      };
    }
  }, []);

  return (
    <div className={styles.contents.wrapper}>
      <article className={styles.contents.inner}>
        <Contents contents={detailContents?.data} />
      </article>
      <hr className={styles.line} />
      <aside className={styles.comment.wrapper}>
        <CommentForm count={comments?.data.length} />
        <hr className={styles.line} />
        <ul>
          {comments?.data.map((comment: comment) => (
            <li key={`comment_${comment.commentId}`}>
              <CommentsList {...comment} />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Detail;
