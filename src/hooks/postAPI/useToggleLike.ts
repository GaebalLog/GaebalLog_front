import { useMutation } from "@tanstack/react-query";

import { postAPI } from "@/api/postAPI";
interface props {
  onAdd: (postId: number) => void;
  onRemove: (postId: number) => void;
}
const useToggleLike = ({ onAdd, onRemove }: props) => {
  return useMutation({
    mutationFn: postAPI.toggleLike,
    onMutate: (postId: number) => {
      onAdd(postId);
    },
    onError: (error, postId) => {
      onRemove(postId);
    },
  });
};

export default useToggleLike;
