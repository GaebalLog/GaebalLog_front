import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import { discussionAPI } from "@/api/discussionAPI";

import { isLoggedInAtom } from "../useUserAuth";
import useModalController from "../useModalController";
interface props {
  onToggle: (discussionId: number) => void;
}
const useToggleDiscussionBookmark = ({ onToggle }: props) => {
  const isLoggedin = useRecoilValue(isLoggedInAtom);
  const { openModal } = useModalController();
  const mutation = useMutation({
    mutationFn: discussionAPI.toggleBookmark,
    onSuccess(data, discussionId) {
      onToggle(discussionId);
    },
  });
  if (!isLoggedin) return { mutate: () => openModal("requiredLogin") };
  return mutation;
};

export default useToggleDiscussionBookmark;
