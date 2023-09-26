import { useRecoilState, useSetRecoilState } from "recoil";
import { atom } from "recoil";

interface Atom {
  defaultModal: boolean;
  headerTag: boolean;
  headerSearch: boolean;
  keywordSearch: boolean;
  mypageSearch: boolean;
  myPageDropDownType: boolean;
  discussionMore: boolean;
  discussionExit: boolean;
  deleteModal: boolean;
  calendarModal: boolean;
  thumbnailSelectModal: boolean;
  requiredLogin: boolean;
}
export const modalControlAtom = atom<Atom>({
  key: "modalController",
  default: {
    defaultModal: false,
    headerTag: false,
    headerSearch: false,
    keywordSearch: false,
    mypageSearch: false,
    myPageDropDownType: false,
    discussionMore: false,
    discussionExit: false,
    deleteModal: false,
    thumbnailSelectModal: false,
    calendarModal: false,
    requiredLogin: false,
  },
});
export const activatedModalIdAtom = atom<string | number | null>({
  key: "activeModalId",
  default: null,
});

type ModalType = keyof Atom;
/**
 * @description
 * @example
 * const { modal, openModal, closeModal } = useModalControll();
 * openModal("explain");
 * closeModal("explain");
 * @important
 * modal 상태를 사용하는 부모 컴포넌트에 onClick={(e) => e.stopPropagation()} 필수
 */
const useModalController = () => {
  const [modal, modalControl] = useRecoilState(modalControlAtom);
  const setActivatedId = useSetRecoilState(activatedModalIdAtom);
  const allCloseModal = () => {
    for (const key in modal) {
      closeModal(key as ModalType);
    }
    setActivatedId(null);
  };
  const openModal = (type: ModalType, all?: boolean) => {
    if (all) allCloseModal();
    modalControl((prev) => ({
      ...prev,
      [type]: true,
    }));
  };
  const closeModal = (type: ModalType) => {
    modalControl((prev) => ({
      ...prev,
      [type]: false,
    }));
  };
  const toggleModal = (type: ModalType) => {
    modalControl((prev) => {
      const value = prev[type];
      return {
        ...prev,
        [type]: !value,
      };
    });
  };
  return { modal, openModal, closeModal, toggleModal, allCloseModal };
};

export default useModalController;
