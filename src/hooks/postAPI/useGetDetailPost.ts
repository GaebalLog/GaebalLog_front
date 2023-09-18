import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { commentAtom } from "@/constants/global/atoms";
import { postAPI } from "@/api/postAPI";

const useGetDetailPost = ({
  onSuccessSet,
}: {
  onSuccessSet: (data: postListAuthor) => void;
}) => {
  const { postId } = useRecoilValue(commentAtom);
  return useQuery({
    queryKey: [QUERY_KEYS.POST, postId],
    queryFn: () => postAPI.getDetail(postId),
    onSuccess: (data) => {
      onSuccessSet(data.data);
    },
  });
};

export default useGetDetailPost;
