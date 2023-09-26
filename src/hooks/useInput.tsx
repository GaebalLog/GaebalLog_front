import type React from "react";
import { useState } from "react";

const useInput = (initialState?: string) => {
  const [value, setValue] = useState<string>(initialState ?? "");

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
