import { useRecoilState, useSetRecoilState } from "recoil";
import { atom } from "recoil";

interface Atom {
  defaultModal: boolean;
  headerSearch: boolean;
  mypageSearch: boolean;
  myNeightborsType: boolean;
  discussionMore: boolean;
  discussionExit: boolean;
  calendarModal: boolean;
}
export const modalControlAtom = atom<Atom>({
  key: "modalController",
  default: {
    defaultModal: false,
    headerSearch: false,
    mypageSearch: false,
    myNeightborsType: false,
    discussionMore: false,
    discussionExit: false,
    calendarModal: false,
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
  const openModal = (type: ModalType) => {
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
  const allCloseModal = () => {
    for (const key in modal) {
      closeModal(key as ModalType);
    }
    setActivatedId(null);
  };
  return { modal, openModal, closeModal, toggleModal, allCloseModal };
};

export default useModalController;
