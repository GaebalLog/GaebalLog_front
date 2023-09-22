import { rest } from "msw";

const profileImage =
  "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80";

export const myPageHandler = [
  // 참여한 카테고리
  rest.get("/api/users/times", (req, res, ctx) => {
    const categories: timeOfLearning[] = [
      {
        category: "리액트",
        timespent: 1,
      },
      {
        category: "Next",
        timespent: 20000,
      },
      {
        category: "Javascript",
        timespent: 3,
      },
    ];
    return res(ctx.status(200), ctx.json({ categories }));
  }),

  // 내 정보
  rest.patch("/users/name", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch("/users/image", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // 내가 쓴 글
  rest.get("/api/mypage/mywritten/myBookmarks", (req, res, ctx) => {
    const posts: posts = [
      {
        postId: 1,
        title: "내가 북마크한 글1",
        content: "content",
        categories: ["tags", "tåg2"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: true,
        createdAt: "2021-08-10T14:00:00.000Z",
      },
    ];
    return res(ctx.status(200), ctx.json({ posts }));
  }),
  rest.get("/api/mypage/mywritten/myComments", (req, res, ctx) => {
    const posts: posts = [
      {
        postId: 1,
        title: "내가 댓글 단 글1",
        content: "content",
        categories: ["tags", "tåg2"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: true,
        createdAt: "2021-08-10T14:00:00.000Z",
      },
    ];
    return res(ctx.status(200), ctx.json({ posts }));
  }),
  rest.get("/api/mypage/mywritten/myLikes", (req, res, ctx) => {
    const posts: posts = [
      {
        postId: 1,
        title: "내가 좋아요 한 글1",
        content: "content",
        categories: ["tags", "tåg2"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: true,
        createdAt: "2021-08-10T14:00:00.000Z",
      },
    ];
    return res(ctx.status(200), ctx.json({ posts }));
  }),

  // 이웃 관리
  rest.get("/api/neighbors/addedByMe", (req, res, ctx) => {
    const neighbors = [
      {
        userId: 1,
        nickname: "내가 추가한 이웃1",
        profileImage: profileImage,
      },
      {
        userId: 2,
        nickname: "내가 추가한 이웃2",
        profileImage: profileImage,
      },
    ];
    return res(ctx.status(200), ctx.json([...neighbors]));
  }),
  rest.get("/api/neighbors/addedByYou", (req, res, ctx) => {
    const neighbors = [
      {
        userId: 1,
        nickname: "나를 추가한 이웃1",
        profileImage: profileImage,
      },
      {
        userId: 2,
        nickname: "나를 추가한 이웃2",
        profileImage: profileImage,
      },
    ];
    return res(ctx.status(200), ctx.json([...neighbors]));
  }),
  rest.get("/api/neighbors/addedByBoth", (req, res, ctx) => {
    const neighbors = [
      {
        userId: 1,
        nickname: "서로 이웃1",
        profileImage: profileImage,
      },
      {
        userId: 2,
        nickname: "서로 이웃2",
        profileImage: profileImage,
      },
    ];
    return res(ctx.status(200), ctx.json([...neighbors]));
  }),
  rest.get("/api/neighbors/bannedByMe", (req, res, ctx) => {
    const neighbors = [
      {
        userId: 1,
        nickname: "차단한 이웃1",
        profileImage: profileImage,
      },
      {
        userId: 2,
        nickname: "차단한 이웃2",
        profileImage: profileImage,
      },
    ];
    return res(ctx.status(200), ctx.json([...neighbors]));
  }),
];
