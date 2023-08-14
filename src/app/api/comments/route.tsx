import { NextResponse } from "next/server";

export const GET = async () => {
  const comments = [
    {
      commentId: "1",
      nickname: "1yoouoo",
      profileImage: "",
      contents: "정말 유익한 글이었습니다.",
      createdAt: "2023-08-05T14:00:00Z",
      isDeleted: false,
      childComments: [],
    },
    {
      commentId: "2",
      nickname: "cordelia273",
      profileImage: "",
      contents: "깔끔하게 잘 정해주셨네요.",
      createdAt: "2023-07-13T14:00:00Z",
      isDeleted: false,
      childComments: [
        {
          commentId: "3",
          nickname: "ice coffee2031",
          profileImage: "",
          contents: "저도 그렇게 생각합니다ㅋㅋ",
          createdAt: "2023-07-13T14:00:00Z",
          isDeleted: false,
          childComments: [
            {
              commentId: "4",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "ffff",
              createdAt: "2023-07-13T14:00:00Z",
              isDeleted: false,
              childComments: [],
            },
            {
              commentId: "5",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "eeee",
              createdAt: "2023-07-13T14:00:00Z",
              isDeleted: false,
              childComments: [],
            },
          ],
        },
        {
          commentId: "6",
          nickname: "ice coffee2031",
          profileImage: "",
          contents: "다시 생각해 보니 아닌 것 같네요ㅡㅡ",
          createdAt: "2023-07-13T14:00:00Z",
          isDeleted: false,
          childComments: [],
        },
      ],
    },
    {
      commentId: "7",
      nickname: "yeon",
      profileImage: "",
      contents: "한번에 알 수 있어서 너무 좋아요 :) 감사합니다.",
      createdAt: "2023-07-02T14:00:00Z",
      isDeleted: false,
      childComments: [
        {
          commentId: "8",
          nickname: "ice coffee2031",
          profileImage: "",
          contents: "ffff",
          createdAt: "2023-07-13T14:00:00Z",
          isDeleted: false,
          childComments: [],
        },
        {
          commentId: "9",
          nickname: "ice coffee2031",
          profileImage: "",
          contents: "eeee",
          createdAt: "2023-07-13T14:00:00Z",
          isDeleted: false,
          childComments: [],
        },
        {
          commentId: "10",
          nickname: "ice coffee2031",
          profileImage: "",
          contents: "2222",
          createdAt: "2023-07-13T14:00:00Z",
          isDeleted: false,
          childComments: [],
        },
      ],
    },
  ];
  return NextResponse.json(comments);
};
