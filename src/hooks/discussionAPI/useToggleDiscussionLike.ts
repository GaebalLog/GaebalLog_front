import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { discussionAPI } from "@/api/discussionAPI";

import { isLoggedInAtom } from "../useUserAuth";
import useModalController from "../useModalController";
interface props {
  onToggle: (discussionId: number) => void;
}
const useToggleDiscussionLike = ({ onToggle }: props) => {
  const isLoggedin = useRecoilValue(isLoggedInAtom);
  const { openModal } = useModalController();
  const mutation = useMutation({
    mutationFn: discussionAPI.toggleLike,
    onSuccess: (error, discussionId) => {
      onToggle(discussionId);
    },
  });
  if (!isLoggedin)
    return {
      mutate: () => openModal("requiredLogin"),
    };
  else return mutation;
};

export default useToggleDiscussionLike;
