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

  // 글 관리
  rest.get("/post/previews", (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    if (type === "me") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: "1",
            userId: "1",
            title: "내가 쓴 글1",
            content: "content",
            nickname: "hi",
            categories: ["tags", "tåg2"],
            like: 1,
            view: 1,
            isBookmarked: false,
            createdAt: "2021-08-10T14:00:00.000Z",
          },
        ]),
      );
    } else if (type === "bookmark") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: "1",
            userId: "1",
            title: "내가 북마크한 글1",
            content: "content",
            nickname: "hi",
            categories: ["tags", "tåg2"],
            like: 1,
            view: 1,
            isBookmarked: true,
            createdAt: "2021-08-10T14:00:00.000Z",
          },
        ]),
      );
    } else if (type === "comment") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: "1",
            userId: "1",
            title: "내가 댓글 단 글1",
            content: "content",
            nickname: "hi",
            categories: ["tags", "tåg2"],
            like: 1,
            view: 1,
            isBookmarked: false,
            createdAt: "2021-08-10T14:00:00.000Z",
          },
        ]),
      );
    } else if (type === "like") {
      return res(
        ctx.status(200),
        ctx.json([
          {
            postId: "1",
            userId: "1",
            title: "내가 좋아요 한 글1",
            content: "content",
            nickname: "hi",
            categories: ["tags", "tåg2"],
            like: 1,
            view: 1,
            isBookmarked: false,
            createdAt: "2021-08-10T14:00:00.000Z",
          },
        ]),
      );
    }
  }),
  // rest.get("/api/mypage/mywritten/myTempSaves", (req, res, ctx) => {
  //   const posts: posts = [
  //     {
  //       postId: 1,
  //       title: "임시저장 글1",
  //       content: "content",
  //       categories: ["tags", "tåg2"],
  //       like: 1,
  //       count: 1,
  //       nickname: "hi",
  //       thumbnail:
  //         "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
  //       isBookmarked: true,
  //       createdAt: "2021-08-10T14:00:00.000Z",
  //     },
  //   ];
  //   return res(ctx.status(200), ctx.json({ posts }));
  // }),

  // 이웃 관리
  rest.get("/users/neighbors/following/:id", (req, res, ctx) => {
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
  rest.get("/users/neighbors/follower/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          nickname: "나를 추가한 이웃1",
          imageUrl: profileImage,
        },
        {
          userId: 2,
          nickname: "나를 추가한 이웃2",
          imageUrl: profileImage,
        },
      ]),
    );
  }),
  // rest.get("/neighbors/addedByBoth", (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         userId: 1,
  //         nickname: "서로 이웃1",
  //         imageUrl: profileImage,
  //       },
  //       {
  //         userId: 2,
  //         nickname: "서로 이웃2",
  //         imageUrl: profileImage,
  //       },
  //     ]),
  //   );
  // }),
  rest.get("/users/block", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          nickname: "차단한 이웃1",
          imageUrl: profileImage,
        },
        {
          userId: 2,
          nickname: "차단한 이웃2",
          imageUrl: profileImage,
        },
      ]),
    );
  }),

  // 토의 관리방
  rest.get("/discussions/previews/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          discussionId: "1",
          nickname: "안녕",
          title: "내가 쓴 토의1",
          content: "내용",
          status: "end",
          createdAt: "2023-08-28 17:08:22",
          userId: "1",
          categories: ["카테고리1", "카테고리2"],
        },
      ]),
    );
  }),
  rest.get("/discussions/previews/neighbors", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          discussionId: "1",
          nickname: "안녕",
          title: "이웃이 쓴 토의1",
          content: "내용",
          status: "end",
          createdAt: "2023-08-28 17:08:22",
          userId: "1",
          categories: ["카테고리1", "카테고리2"],
        },
      ]),
    );
  }),

  // 유저 상세 페이지
  rest.get("/api/users/tech/:name", (req, res, ctx) => {
    const posts: posts = [
      {
        postId: 1,
        title: "이웃이 쓴 글",
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
  rest.get("/api/users/discussion/:name", (req, res, ctx) => {
    const discussions: discussions = [
      {
        chatListId: 1,
        nickname: "나나",
        title: "이웃이 쓴 토의1",
        categories: ["카테고리1", "카테고리2"],
        createdAt: "2023-08-28 17:08:22",
        remainingTime: 1,
        isparticipated: true,
        isDone: true,
      },
    ];
    return res(ctx.status(200), ctx.json({ discussions }));
  }),
];
