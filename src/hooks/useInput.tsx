import type React from "react";
import { useState } from "react";

const useInput = (initialState?: string | number) => {
  const [value, setValue] = useState<string | number>(initialState ?? "");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };
  const resetHandler = () => {
    setValue("");
  };

  return { value, onChange, setValue, resetHandler };
};

export default useInput;
