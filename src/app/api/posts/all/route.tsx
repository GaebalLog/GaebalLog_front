import { NextResponse } from "next/server";

export const GET = async () => {
  const posts: postDetail[] = [
    {
      post_id: 1,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      nickname: "hi",
      img: ["<img></img>"],
      created_at: new Date().toDateString(),
      bookmarked: true,
    },
    {
      post_id: 2,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      nickname: "hi",
      img: ["<img></img>"],
      created_at: new Date().toDateString(),
      bookmarked: true,
    },
    {
      post_id: 3,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      nickname: "hi",
      img: ["<img></img>"],
      created_at: new Date().toDateString(),
      bookmarked: true,
    },
  ];
  return NextResponse.json({ posts });
};
