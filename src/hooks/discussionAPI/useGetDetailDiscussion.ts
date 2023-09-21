import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/constants/global/querykeys";
import { discussionAtom } from "@/constants/global/atoms";
import { discussionAPI } from "@/api/discussionAPI";

const useGetDetailDiscussion = ({
  onSuccessSet,
  optionalId,
}: {
  onSuccessSet?: (data: detailDisccussion) => void;
  optionalId?: number;
} = {}) => {
  const { discussionId } = useRecoilValue(discussionAtom);
  const Id = optionalId ?? discussionId;
  return useQuery({
    queryKey: [QUERY_KEYS.DISCUSSION, Id],
    queryFn: () => discussionAPI.getDetail(Id),
    onSuccess: (data) => {
      console.log(data);
      onSuccessSet && onSuccessSet(data.data);
    },
    enabled: Id !== 0,
  });
};

export default useGetDetailDiscussion;
