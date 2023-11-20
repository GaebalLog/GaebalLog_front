import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { QUERY_KEYS } from "@/config/query_config";
import { discussionAtom } from "@/config/constants/atoms";
import { discussionAPI } from "@/config/api/discussionAPI";

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
      onSuccessSet && onSuccessSet(data.data);
    },
    enabled: Id !== 0,
  });
};

export default useGetDetailDiscussion;
