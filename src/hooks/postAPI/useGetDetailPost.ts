import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { commentAtom } from "@/constants/global/atoms";
import { postAPI } from "@/api/postAPI";

const useGetDetailPost = ({
  onSuccessSet,
  optionalId,
}: {
  onSuccessSet: (data: postListAuthor) => void;
  optionalId?: number;
}) => {
  const { postId } = useRecoilValue(commentAtom);
  const Id = optionalId ?? postId;
  return useQuery({
    queryKey: [QUERY_KEYS.POST, Id],
    queryFn: () => postAPI.getDetail(Id),
    onSuccess: (data) => {
      onSuccessSet(data.data);
    },
    enabled: postId !== 0,
  });
};

export default useGetDetailPost;
