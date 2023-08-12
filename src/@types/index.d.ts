import type { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

declare global {
  type bgColor = keyof typeof BG_COLOR;
  type color = keyof typeof TEXT_COLOR;

  // Home 화면
  interface post {
    postId: number;
    title: string;
    content: string;
    thumbnail: string;
    nickname: string;
    tags: string[];
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
  interface chat {
    chatId: number;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
  }
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
