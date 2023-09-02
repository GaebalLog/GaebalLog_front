import type { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

declare global {
  type bgColor = keyof typeof BG_COLOR;
  type color = keyof typeof TEXT_COLOR;

  interface postDetail {
    post_id: number;
    title: string;
    content: string;
    nickname: string;
    view: number;
    like: number;
    img: string[];
    thumbnail?: string;
    categories: string[];
    created_at: string;
    bookmarked: boolean;
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
  interface comment {
    commentId: string;
    nickname: string;
    profileImage: string;
    contents: string;
    createdAt: string;
    isDeleted: boolean;
    childComments: comment[];
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
