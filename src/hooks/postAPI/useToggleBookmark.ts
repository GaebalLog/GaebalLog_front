import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { postAPI } from "@/config/api/postAPI";

import { isLoggedInAtom } from "../useUserAuth";
import useModalController from "../useModalController";
interface props {
  onToggle: (postId: number) => void;
}
const useToggleBookmark = ({ onToggle }: props) => {
  const isLoggedin = useRecoilValue(isLoggedInAtom);
  const { openModal } = useModalController();
  const mutation = useMutation({
    mutationFn: postAPI.toggleBookmark,
    onSuccess(data, postId) {
      onToggle(postId);
    },
  });
  if (!isLoggedin) return { mutate: () => openModal("requiredLogin") };
  return mutation;
};

export default useToggleBookmark;
