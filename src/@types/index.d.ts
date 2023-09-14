import type { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

declare global {
  type bgColor = keyof typeof BG_COLOR;
  type color = keyof typeof TEXT_COLOR;

  interface postDetail {
    postId: number;
    title: string;
    content: string;
    nickname: string;
    view: number;
    like: number;
    liked: boolean;
    img: string[];
    thumbnail: string | null;
    categories: string[];
    createdAt: string;
    bookmarked: boolean;
  }
  interface postListAuthor extends postDetail {
    isAuthor: boolean;
  }

  // Home 화면
  interface post {
    postId: number;
    title: string;
    content: string;
    thumbnail: string;
    nickname: string;
    categories: string[];
    like: number;
    count: number;
    isBookmarked: boolean;
    createdAt: Date;
  }
  type posts = post[];

  export interface commentRequest {
    parentId?: number | null;
    content: string;
  }
  export interface createComment extends commentRequest {
    postId: number;
  }
  interface comment {
    commentId: number;
    postId: number;
    parentId: number;
    nickname: string;
    profileImg: string;
    userId: number;
    content: string;
    createdAt: string;
    isDeleted: boolean;
    isBlocked: boolean;
  }
  interface parentsComment extends comment {
    child?: comment[];
  }
  interface grandParentsComment extends comment {
    child: parentsComment[];
  }
  interface discussion {
    chatListId: number;
    nickname: string;
    title: string;
    categories: string[];
    thumbnail: string;
    remainingTime: number;
    isparticipated: bool;
  }
  type discussions = discussion[];
  interface chat {
    chatId: number;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
  }
  interface neighborItem {
    userId: number;
    nickname: string;
    profileImage: string;
  }

  interface chatItemAtSide {
    chatListId: number;
    title: string;
  }
  interface timeOfLearning {
    category: string;
    timespent: number;
  }
  interface myInfo {
    nickname: string;
    profileImg: string;
    postsno: number;
    chatlistno: number;
    alarm_reply: boolean;
    alarm_neighbors: boolean;
    alarm_discussion: boolean;
  }
  const sortList = [
    "조회 순",
    "최신순",
    "전체글",
    "My Friends' Articles",
  ] as const;
  type sortTab = (typeof sortTab)[number];
}

declare module "ckeditor5-custom-build/build/ckeditor" {
  const CustomEditorBuild: {
    create(
      elementOrData: HTMLElement | string,
      config?: object,
    ): Promise<CustomEditor>;
  };

  export = CustomEditorBuild;
}
