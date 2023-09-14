import { useMutation } from "@tanstack/react-query";

import { postAPI } from "@/api/postAPI";
interface props {
  onToggle: (postId: number) => void;
}
const useToggleBookmark = ({ onToggle }: props) => {
  return useMutation({
    mutationFn: postAPI.toggleBookmark,
    onSuccess(data, postId) {
      onToggle(postId);
    },
  });
};

export default useToggleBookmark;
