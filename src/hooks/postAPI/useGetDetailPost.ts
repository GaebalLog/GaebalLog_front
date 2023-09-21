import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { postAtom } from "@/constants/global/atoms";
import { postAPI } from "@/api/postAPI";

const useGetDetailPost = ({
  onSuccessSet,
  optionalId,
}: {
  onSuccessSet: (data: postListAuthor) => void;
  optionalId?: number;
}) => {
  const { postId } = useRecoilValue(postAtom);
  const Id = optionalId ?? postId;
  return useQuery({
    queryKey: [QUERY_KEYS.POST, Id],
    queryFn: () => postAPI.getDetail(Id),
    onSuccess: (data) => {
      onSuccessSet(data.data);
    },
    enabled: Id !== 0,
  });
};

export default useGetDetailPost;
