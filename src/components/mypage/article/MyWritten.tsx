import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const MyWritten = () => {
  const { data } = useQuery({
    queryKey: ["myWritten"],
    queryFn: async () => await axios.get("/api/mypage/mywritten"),
  });
  const postList = data?.data.posts;
  return (
    <React.Fragment>
      내가 쓴 글
      {postList?.map((post: post) => {
        return <h1 key={`post${post.postId}`}>{post.title}</h1>;
      })}
    </React.Fragment>
  );
};

export default MyWritten;
