import { NextResponse } from "next/server";

export const GET = async () => {
  const posts: postDetail[] = [
    {
      post_id: 1,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      view: 1,
      nickname: "hi",
      img: "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      created_at: new Date().toDateString(),
    },
    {
      post_id: 2,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      view: 1,
      nickname: "hi",
      img: "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      created_at: new Date().toDateString(),
    },
    {
      post_id: 3,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      view: 1,
      nickname: "hi",
      img: "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      created_at: new Date().toDateString(),
    },
  ];
  return NextResponse.json({ posts });
};
