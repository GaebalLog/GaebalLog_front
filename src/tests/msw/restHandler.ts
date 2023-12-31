import { rest } from "msw";

const myKeyword = [
  { keyword: "개발자" },
  { keyword: "깃헙사용법정리" },
  { keyword: "깃허브" },
  { keyword: "코딩용어" },
  { keyword: "알고리즘" },
  { keyword: "Pascal" },
  { keyword: "Object" },
  { keyword: "IMP" },
  { keyword: "Javascript" },
];

export const restHandler = [
  // 카테고리
  rest.get("/api/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["test1", "test2", "test3"]));
  }),
  rest.get("/keywords", (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    if (type === "me") {
      return res(ctx.status(200), ctx.json(myKeyword));
    } else {
      return res(
        ctx.status(200),
        ctx.json([
          { keyword: "Github" },
          { keyword: "Java" },
          { keyword: "Physon" },
          { keyword: "IMP" },
          { keyword: "Language" },
          { keyword: "ALGOL" },
          { keyword: "Javascript" },
          { keyword: "PEARL" },
          { keyword: "Object" },
          { keyword: "PL/SQL" },
          { keyword: "Pascal" },
          { keyword: "JASS" },
        ]),
      );
    }
  }),

  rest.get("/keywords/search", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        "리액트네이티브",
        "리액트네이티브 ios",
        "리액트네이티브 애니메이션",
        "리액트네이티브 플러터 차이",
        "리액트네이티브 튜토리얼",
      ]),
    );
  }),

  rest.post("/keywords", async (req, res, ctx) => {
    const { keyword } = await req.json();
    myKeyword.push({ keyword });
    return res(ctx.status(200));
  }),

  //토의방 api
  rest.get("/api/chatlists/1", (req, res, ctx) => {
    const discussions: discussions = [
      {
        chatListId: 1,
        nickname: "나나",
        title: "제목1",
        categories: ["카테고리1", "카테고리2"],
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        remainingTime: 1,
        isparticipated: true,
      },
      {
        chatListId: 2,
        nickname: "나나",
        title: "제목1",
        categories: ["카테고리1", "카테고리2"],
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        remainingTime: 1,
        isparticipated: false,
      },
      {
        chatListId: 3,
        nickname: "나나",
        title: "제목1",
        categories: ["카테고리1", "카테고리2"],
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        remainingTime: 1,
        isparticipated: true,
      },
    ];
    return res(ctx.status(200), ctx.json({ discussions }));
  }),

  rest.get("/api/users/chatlists", (req, res, ctx) => {
    const chatList: chatItemAtSide[] = [
      {
        chatListId: 1,
        title: "채팅방1",
      },
      {
        chatListId: 2,
        title: "채팅방2",
      },
      {
        chatListId: 3,
        title: "채팅방3",
      },
    ];
    return res(ctx.status(200), ctx.json({ chatList }));
  }),
  rest.get("/api/chatrooms/:chatroomId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        chatRoomId: 1,
        userId: 2,
        socketRoom: "",
        ChatList: [],
        title: "next.js로 개발할 때 스타일링을 어떻게 하는 것이 좋을까요?",
        content: `<h2 style="text-align:center;">안녕하세요</h2><h3>제목 아무개</h3><h4>ㅇㅇㅇㅇㅇ</h4><pre><code class="language-plaintext">호롤롤</code></pre><p>✅Git 명령어 활용하기<br><br>git init<br>git add &lt;파일명&gt; 혹은 git add .<br>git commit -m "커밋 메세지"<br>git log<br>git status<br>git branch<br>git switch &lt;브랜치명&gt; 혹은 git checkout &lt;브랜치명&gt;<br>git merge<br>git stash</p><p>&nbsp;</p><p>git init: 저장소 만들기<br>해당 경로에 .git이라는 폴더가 만들어진다.<br>개발 프로젝트 시작 시 딱 한 번만 입력하면 된다.<br><br>📌git add: 저장할 파일을 지정하기<br>git add &lt;파일명&gt; : 특정 파일만 저장<br>git add . : 현재 폴더에 있는 모든 파일을 저장<br><br>📌git commit: 실제로 저장하기<br>git commit -m “커밋 메세지”<br><br><br>📌git log: 커밋 내역 보기<br>git log에서 빠져나오고 싶다면 키보드에서 q를 입력한다.<br><br>📌git status: 작업 디렉터리 상태보기<br>master 브랜치에 있고, 아무런 커밋도 하지 않았음을 의미<br><br>📌git branch: 브랜치 나누기<br>git branch &lt;브랜치명&gt;<br>원본 파일을 변경하지 않고, 새로운 곳에 코드를 짤 수 있다.<br><br>📌git checkout: 해당 브랜치로 이동하기<br>git switch &lt;브랜치명&gt; 혹은 git checkout &lt;브랜치명&gt;<br><br>&nbsp;</p>`,
        thumbnail:
          "https://images.unsplash.com/photo-1690626826433-08108e7a4516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        like: 12876712512,
        myParticipationTime: "22시간 22분",
        discussionEndTime: "18시",
        remainingTime: "13분",
      }),
    );
  }),
  rest.get("/api/discussionprogress/:chatroomId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        "<div>스타일 컴포넌트 : 반영 가능하지만 무거워서 싫다는 의견이 다수라서 제외</div>",
      ),
    );
  }),
  rest.get("/api/chat/:chatRoomId", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          chatId: 1,
          userId: 2,
          nickname: "쿠쿠다스",
          profileImage:
            "https://images.unsplash.com/photo-1691349168679-9eed7373321a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          content: "안녕하세요",
        },
        {
          chatId: 2,
          userId: 1,
          nickname: "최지현",
          profileImage:
            "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
          content: "where are you form?",
        },
        {
          chatId: 3,
          userId: 1,
          nickname: "최지현",
          profileImage:
            "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
          content: "from",
        },
        {
          chatId: 4,
          userId: 2,
          nickname: "쿠쿠다스",
          profileImage:
            "https://images.unsplash.com/photo-1691349168679-9eed7373321a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          content: "저 한국사람인데요",
        },
        {
          chatId: 5,
          userId: 1,
          nickname: "최지현",
          profileImage:
            "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
          content: "아하",
        },
      ]),
    );
  }),
];
