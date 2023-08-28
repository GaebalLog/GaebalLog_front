import React from "react";

import { BG_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";
import useIcon from "@/hooks/useIcon";
import Button from "@/components/designSystem/Button";

import Modal from "../Modal";

const styles = {
  wrapper: `flex flex-col items-center w-[780px] h-[400px]`,
  closeIcon: `self-end m-6`,
  title: `text-2xl font-bold mt-[34px]`,
  content: `text-center mt-14`,
  buttonBox: `flex mt-auto mb-[50px] gap-[105px]`,
};

interface confirmModalProps {
  title: string;
  content: React.ReactNode;
  onNegativeClick: () => void;
  onPositiveClick: () => void;
}

const ConfirmModal: React.FC<confirmModalProps> = ({
  title,
  content,
  onNegativeClick,
  onPositiveClick,
}) => {
  const { allCloseModal } = useModalController();
  const { getIcon } = useIcon();
  const defaultClose = getIcon("default_close", 18, 18);

  return (
    <Modal isFixed isBgColor>
      <div
        className={`${styles.wrapper} ${BG_COLOR.general02}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeIcon} onClick={() => allCloseModal()}>
          {defaultClose}
        </button>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{content}</div>
        <div className={styles.buttonBox}>
          <Button
            className="w-[224px]"
            size="bigLogin"
            color="white"
            onClick={onNegativeClick}
          >
            아니오
          </Button>
          <Button
            className="w-[224px]"
            size="bigLogin"
            color="white"
            onClick={onPositiveClick}
          >
            예
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
