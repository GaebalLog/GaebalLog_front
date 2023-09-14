import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { commentAPI } from "@/api/commentAPI";
import { commentAtom } from "@/constants/global/atoms";

import useGetComments from "./useGetComments";
interface params {
  parentId?: number | null;
  content: string;
}
const useCreateComment = ({ parentId, content }: params) => {
  const { postId } = useRecoilValue(commentAtom);
  const data = { postId, parentId, content };
  const { refetch } = useGetComments();
  return useMutation({
    mutationFn: () => commentAPI.createComment(data),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useCreateComment;
