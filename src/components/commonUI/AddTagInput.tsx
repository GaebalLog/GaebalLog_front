import React from "react";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

import NonPortalModal from "../modal/NonPortalModal";

const styles = {
  tagDiv: `relative w-[1068px] flex items-center p-3 ${BORDER_COLOR.button} rounded-full`,
  input: `flex-grow py-1 px-2 outline-none`,
  modal: `py-4 px-6 ${BG_COLOR.general06} ${TEXT_COLOR.inverse}`,
  tag: `flex gap-[6px] mr-1 px-3`,
};

interface addTagInputProps {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const AddTagInput: React.FC<addTagInputProps> = ({
  value,
  onChange,
  setValue,
}) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const { getIcon } = useIcon();
  const close = getIcon("default_close", 9, 9);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value !== "" && tags.length < 3) {
      setTags((prevTags) => [...prevTags, `#${value}`]);
      setValue("");
    }
  };
  const handleTagDelete = (selectedTag: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== selectedTag));
  };

  return (
    <div className={styles.tagDiv}>
      {tags.map((tag, index) => (
        <div key={index} className={styles.tag}>
          <span>{tag}</span>
          <button type="button" onClick={() => handleTagDelete(tag)}>
            {close}
          </button>
        </div>
      ))}
      <input
        value={value}
        placeholder="태그는 최대 3개까지 입력할 수 있습니다."
        onFocus={() => setIsModal(true)}
        onBlur={() => setIsModal(false)}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      {isModal && (
        <NonPortalModal topLeft={{ top: -70, left: 0 }} nonBackdrop>
          <div className={styles.modal}>
            해쉬태그 또는 엔터를 입력하여 태그를 등록할 수 있습니다.
          </div>
        </NonPortalModal>
      )}
    </div>
  );
};

export default AddTagInput;
