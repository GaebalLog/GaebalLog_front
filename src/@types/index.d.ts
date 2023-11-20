import type { BG_COLOR, TEXT_COLOR } from "@/config/constants/colors";

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

  // discussion
  interface discussion {
    discussionId: number;
    thumbnail: string;
    nickname: string;
    title: string;
    category: string[];
    remainingTime: number;
    participating: boolean;
    liked: boolean;
    like: number;
    capacity: number;
    participants: number;
  }
  interface detailDisccussion extends discussion {
    content: string;
    image: string[];
    isAuthor: boolean;
    startDate: string;
    endDate: string;
    elapsedDate: string;
  }
  interface chatroom {
    data: {
      chatRoomId: number;
      userId: number;
      socketRoom: [];
      ChatList: [];
      title: string;
      content: string;
      thumbnail: string;
      like: number;
      myParticipationTime: string;
      discussionEndTime: string;
      remainingTime: string;
    };
  }
  interface beforeDiscussion {
    chatListId: number;
    nickname: string;
    title: string;
    thumbnail?: string;
    categories: string[];
    createdAt?: string;
    isDone?: boolean;
    remainingTime: number;
    isparticipated: boolean;
  }
  interface myDiscussion {
    discussionId: string;
    nickname: string;
    title: string;
    content: string;
    status: string;
    createdAt: string;
    userId: string;
    remainingTime: string;
    categories: string[];
  }
  type discussions = beforeDiscussion[];

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
    createdAt: string;
  }
  type posts = post[];

  interface myPost {
    postId: string;
    userId: string;
    title: string;
    content: string;
    nickname: string;
    categories: string[];
    like: number;
    view: number;
    isBookmarked: boolean;
    createdAt: string;
  }
  type myPosts = myPost[];

  export interface commentRequest {
    parentId?: number | null;
    content: string;
  }
  export interface createComment extends commentRequest {
    postId: number;
  }
  interface comment {
    commentId: number;
    nickname: string;
    profileImg: string;
    content: string;
    createdAt: string;
    isDeleted: boolean;
    isBlocked: boolean;
    userId: string;
  }
  interface parentsComment extends comment {
    child?: comment[];
  }
  interface grandParentsComment extends comment {
    child: parentsComment[];
  }
  interface commentList {
    totalResults: number;
    totalPages: number;
    comment: grandParentsComment[];
  }
  interface chat {
    chatId: number;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
  }
  interface neighborItem {
    userId: string;
    nickname: string;
    imageUrl: string;
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

  interface error {
    response: {
      data: object;
      status: number;
    };
  }

  interface preferencesResponse {
    neighborAlert: boolean;
    commentAlert: boolean;
    chatAlert: boolean;
    setNeighborPrivate: boolean;
  }

  interface selectedDates {
    year: number;
    month: number;
    date: number;
  }

  interface queryError {
    response?: {
      status: number;
    };
  }
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
