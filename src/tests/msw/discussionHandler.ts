import { rest } from "msw";

const discussion: discussion[] = [
  {
    discussionId: 6,
    thumbnail: "asd",
    title: "ttㅁㄴㄹㅁㄴㄹt",
    category: ["12312441412", "asd"],
    participating: false,
    liked: false,
    like: 0,
    remainingTime: 0,
    capacity: 10,
    nickname: "a",
    participants: 1,
  },
  {
    discussionId: 5,
    thumbnail: "assdfsdd",
    title: "ttㅁㄴㄹㅁㄴㄹt",
    category: ["12312441412", "asd"],
    participating: false,
    liked: false,
    like: 0,
    remainingTime: 0,
    capacity: 20,
    nickname: "kakao",
    participants: 1,
  },
];
const discussionList: detailDisccussion[] = [
  {
    discussionId: 5,
    thumbnail: "assdfsdd",
    title: "ttㅁㄴㄹㅁㄴㄹt",
    content: "asd",
    category: ["asd", "12312441412"],
    image: ["asd", "zxczxcz"],
    participating: false,
    liked: false,
    isAuthor: false,
    like: 0,
    startDate: "2023-09-20T12:00:00.000Z",
    endDate: "2023-09-20T12:00:01.000Z",
    remainingTime: 0,
    capacity: 20,
    nickname: "a",
    participants: 1,
    elapsedDate: "2023-09-20T12:00:01.000Z",
    // participationResponse: {
    //   status: 409,
    //   message: "Already participating",
    // },
  },
  {
    discussionId: 6,
    thumbnail: "assdfsdd",
    title: "ttㅁㄴㄹㅁㄴㄹt",
    content: "asd",
    category: ["asd", "12312441412"],
    image: ["asd", "zxczxcz"],
    participating: false,
    liked: false,
    isAuthor: true,
    like: 0,
    startDate: "2023-09-20T12:00:00.000Z",
    endDate: "2023-09-20T12:00:01.000Z",
    remainingTime: 0,
    capacity: 20,
    nickname: "kakao",
    participants: 1,
    elapsedDate: "2023-09-20T12:00:01.000Z",
    // participationResponse: {
    //   status: 409,
    //   message: "Already participating",
    // },
  },
];

export const discussionHandler = [
  rest.get(`/discussions/all/:sort`, (req, res, ctx) => {
    const sort = req.params.sort;
    const page = req.url.searchParams.get("page");
    if (sort === "views" && page && page < "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: true,
          discussions: discussion,
        }),
      );
    } else if (sort === "views" && page && page === "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: false,
          discussions: [
            {
              discussionId: 7,
              thumbnail: "assdfsdd",
              title: "ttㅁㄴㄹㅁㄴㄹt",
              category: ["12312441412", "asd"],
              participating: false,
              liked: false,
              like: 0,
              remainingTime: 0,
              capacity: 20,
              nickname: "a",
              participants: 1,
            },
          ],
        }),
      );
    } else if (sort === "createdAt") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: false,
          discussions: [
            {
              discussionId: 10,
              thumbnail: "assdfsdd",
              title: "ttㅁㄴㄹㅁㄴㄹt",
              category: ["12312441412", "asd"],
              participating: false,
              liked: false,
              like: 0,
              remainingTime: 0,
              capacity: 20,
              nickname: "a",
              participants: 1,
            },
          ],
        }),
      );
    } else {
      return res(ctx.status(500));
    }
  }),
  rest.get(`/discussions/:discussionId`, (req, res, ctx) => {
    const discussionId = req.params.discussionId;
    const discussion = discussionList.find(
      (discussion) => discussion.discussionId === Number(discussionId),
    );
    return res(ctx.status(200), ctx.json(discussion));
  }),
  rest.get("/discussions/:discussionId/verification", (req, res, ctx) => {
    const discussionId = req.params.discussionId;
    const discussion = discussionList.find(
      (discussion) => discussion.discussionId === Number(discussionId),
    );
    if (discussion) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  }),
  rest.delete("/discussions/:discussionId", (req, res, ctx) => {
    const discussionId = req.params.discussionId;
    const discussion = discussionList.find(
      (discussion) => discussion.discussionId === Number(discussionId),
    );
    if (discussion) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(404));
    }
  }),
];
