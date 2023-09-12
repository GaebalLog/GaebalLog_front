import { NextResponse } from "next/server";

export const GET = async () => {
  const posts: postDetail[] = [
    {
      postId: 1,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      thumbnail: "<img></img>",
      nickname: "hi",
      img: ["<img></img>"],
      createdAt: new Date().toDateString(),
      bookmarked: true,
    },
    {
      postId: 2,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      thumbnail: "<img></img>",
      nickname: "hi",
      img: ["<img></img>"],
      createdAt: new Date().toDateString(),
      bookmarked: true,
    },
    {
      postId: 3,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      liked: true,
      view: 1,
      thumbnail: "<img></img>",
      nickname: "hi",
      img: ["<img></img>"],
      createdAt: new Date().toDateString(),
      bookmarked: true,
    },
  ];
  return NextResponse.json({ posts });
};
