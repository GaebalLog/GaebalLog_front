import { useMutation } from "@tanstack/react-query";

import { postAPI } from "@/api/postAPI";
interface props {
  onToggle: (postId: number) => void;
}
const useToggleLike = ({ onToggle }: props) => {
  return useMutation({
    mutationFn: postAPI.toggleLike,
    onSuccess: (error, postId) => {
      onToggle(postId);
    },
  });
};

export default useToggleLike;
