import { rest } from "msw";

export const handlers = [
  rest.get("/api/detailcontents", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        `<h1>안녕</h1><h2 style="text-align:center;">안녕하세요</h2><h3>제목 아무개</h3><h4>ㅇㅇㅇㅇㅇ</h4><pre><code class="language-plaintext">호롤롤</code></pre><p>✅Git 명령어 활용하기<br><br>git init<br>git add &lt;파일명&gt; 혹은 git add .<br>git commit -m "커밋 메세지"<br>git log<br>git status<br>git branch<br>git switch &lt;브랜치명&gt; 혹은 git checkout &lt;브랜치명&gt;<br>git merge<br>git stash</p><p>&nbsp;</p><p>git init: 저장소 만들기<br>해당 경로에 .git이라는 폴더가 만들어진다.<br>개발 프로젝트 시작 시 딱 한 번만 입력하면 된다.<br><br>📌git add: 저장할 파일을 지정하기<br>git add &lt;파일명&gt; : 특정 파일만 저장<br>git add . : 현재 폴더에 있는 모든 파일을 저장<br><br>📌git commit: 실제로 저장하기<br>git commit -m “커밋 메세지”<br><br><br>📌git log: 커밋 내역 보기<br>git log에서 빠져나오고 싶다면 키보드에서 q를 입력한다.<br><br>📌git status: 작업 디렉터리 상태보기<br>master 브랜치에 있고, 아무런 커밋도 하지 않았음을 의미<br><br>📌git branch: 브랜치 나누기<br>git branch &lt;브랜치명&gt;<br>원본 파일을 변경하지 않고, 새로운 곳에 코드를 짤 수 있다.<br><br>📌git checkout: 해당 브랜치로 이동하기<br>git switch &lt;브랜치명&gt; 혹은 git checkout &lt;브랜치명&gt;<br><br>&nbsp;</p>`,
      ),
    );
  }),
  rest.get("/api/comments", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          commentId: "1",
          nickname: "1yoouoo",
          profileImage: "",
          contents: "정말 유익한 글이었습니다.",
          createdAt: "2023-08-05T14:00:00Z",
          childComments: [],
        },
        {
          commentId: "2",
          nickname: "cordelia273",
          profileImage: "",
          contents: "깔끔하게 잘 정해주셨네요.",
          createdAt: "2023-07-13T14:00:00Z",
          childComments: [
            {
              commentId: "3",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "저도 그렇게 생각합니다ㅋㅋ",
              createdAt: "2023-07-13T14:00:00Z",
              childComments: [
                {
                  commentId: "4",
                  nickname: "ice coffee2031",
                  profileImage: "",
                  contents: "ffff",
                  createdAt: "2023-07-13T14:00:00Z",
                  childComments: [],
                },
                {
                  commentId: "5",
                  nickname: "ice coffee2031",
                  profileImage: "",
                  contents: "eeee",
                  createdAt: "2023-07-13T14:00:00Z",
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
          childComments: [
            {
              commentId: "8",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "ffff",
              createdAt: "2023-07-13T14:00:00Z",
              childComments: [],
            },
            {
              commentId: "9",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "eeee",
              createdAt: "2023-07-13T14:00:00Z",
              childComments: [],
            },
            {
              commentId: "10",
              nickname: "ice coffee2031",
              profileImage: "",
              contents: "2222",
              createdAt: "2023-07-13T14:00:00Z",
              childComments: [],
            },
          ],
        },
      ]),
    );
  }),
];
