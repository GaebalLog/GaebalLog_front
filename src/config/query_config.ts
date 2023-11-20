import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const QUERY_KEYS = {
  KEYWORDLIST: "keywordList",
  POSTLIST: "postlist",
  POST: "post",
  COMMENTS: "comments",
  ALERTSETTING: "alertSetting",
  PARTICIPATEDLIST: "participatedList",
  LIVESEARCH: "liveSearch",
  DISCUSSIONLIST: "discussionList",
  NEIGHBOR: "neighbor",
  MYDISCUSSION: "myDiscussion",
  MYWRITTEN: "myWritten",
  DISCUSSION: "discussion",
  NEIGHBORPROFILE: "neighborProfile",
  NEIGHBORWRITTEN: "neighborWritten",
  NEIGHBORDISCUSSION: "neighborDiscussion",
  NEIGHBORKEYWORD: "neighborKeyword",
};
