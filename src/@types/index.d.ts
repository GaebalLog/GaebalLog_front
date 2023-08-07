import type { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

declare global {
  type bgColor = keyof typeof BG_COLOR;
  type color = keyof typeof TEXT_COLOR;
  interface comment {
    commentId: string;
    nickname: string;
    profileImage: string;
    contents: string;
    createdAt: string;
    isDeleted: boolean;
    childComments: comment[];
  }
}
