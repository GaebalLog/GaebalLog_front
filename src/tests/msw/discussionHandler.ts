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
];
