import type { ChangeEvent } from "react";
import React from "react";

interface CKEditorProps {
  onChange?: (event: null, editor: { getData: () => string }) => void;
  data?: string;
}

export const CKEditor: React.FC<CKEditorProps> = ({ onChange, data }) => {
  return (
    <textarea
      placeholder="내용을 입력해주세요."
      defaultValue={data}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
          onChange(null, {
            getData: () => e.target.value,
          });
        }
      }}
    />
  );
};
