import { rest } from "msw";

export const postHandler = [
  rest.get(
    `${process.env.NEXT_PUBLIC_MAIN_SERVER}/api/post`,
    (req, res, ctx) => {
      const postId = req.url.searchParams.get("id");

      if (postId == "37") {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              post_id: 29,
              nickname: "chxxyx@naver.com",
              title: "update4",
              content: "update45",
              view: null,
              like: null,
              img: "test img update4",
              categories: ["jwt", "aws", "mysql"],
              createdDt: "2023-08-28 17:08:22",
            },
          }),
        );
      } else {
        return res(ctx.status(404));
      }
    },
  ),
];
