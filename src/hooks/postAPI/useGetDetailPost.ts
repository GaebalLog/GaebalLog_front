import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/config/query_config";
import { postAtom } from "@/config/constants/atoms";
import { postAPI } from "@/config/api/postAPI";

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
