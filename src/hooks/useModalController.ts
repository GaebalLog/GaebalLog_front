import { useRecoilState, useSetRecoilState } from "recoil";
import { atom } from "recoil";

interface Atom {
  headerSearch: boolean;
}
export const modalControlAtom = atom<Atom>({
  key: "modalController",
  default: {
    headerSearch: false,
  },
});
export const activeModalIdAtom = atom<string | number | null>({
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
 */

const useModalController = () => {
  const [modal, modalControl] = useRecoilState(modalControlAtom);
  const setActiveModalId = useSetRecoilState(activeModalIdAtom);
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
    setActiveModalId(null);
  };
  return { modal, openModal, closeModal, toggleModal, allCloseModal };
};

export default useModalController;
