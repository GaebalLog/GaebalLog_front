import React from "react";

import InputWithLabel from "../designSystem/InputWithLabel";
import Button from "../designSystem/Button";

const styles = {
  checkDuplicateButton: `mt-auto ml-6 mb-1`,
};

interface InputWitHCheckProps {
  type: "email" | "nickname";
  inputValue: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  setDuplicated: React.Dispatch<React.SetStateAction<boolean | null>>;
  onClick: () => void;
}

const InputWitHCheck: React.FC<InputWitHCheckProps> = ({
  type,
  inputValue,
  setDuplicated,
  onClick,
}) => {
  const inputType = type === "email" ? "email" : "text";

  return (
    <div className="flex">
      <div className="w-[574px]">
        <InputWithLabel
          label={type}
          type={inputType}
          value={inputValue.value + ""}
          onChange={(e) => {
            inputValue.onChange(e);
            setDuplicated(null);
          }}
        />
      </div>
      <div className={styles.checkDuplicateButton}>
        <Button
          data-testid={`${type}Check`}
          type="button"
          size="tab"
          color="white"
          onClick={onClick}
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default InputWitHCheck;
