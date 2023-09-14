import React from "react";
import { useSetRecoilState } from "recoil";

import { TEXT_COLOR } from "@/constants/global/colors";
import { darkAtom } from "@/constants/global/atoms";

interface props {
  onSuccess: (checked?: boolean) => void;
  onFail: (checked?: boolean) => void;
  option?: {
    dark?: boolean;
  };
  isChecked?: boolean;
}

const Toggle: React.FC<props> = ({ onSuccess, onFail, option, isChecked }) => {
  const [checked, setChecked] = React.useState(false);
  const setDarkMode = useSetRecoilState(darkAtom);
  const makeChecked = () => {
    if (option?.dark) {
      document.documentElement.classList.add("dark");
      setDarkMode(1);
    }
    onSuccess(checked);
  };

  const makeNonChecked = () => {
    if (option?.dark) {
      document.documentElement.classList.remove("dark");
      setDarkMode(0);
    }
    onFail(checked);
  };
  const changeChecked = () => {
    setChecked((prev) => !prev);
    checked ? makeNonChecked() : makeChecked();
  };

  React.useEffect(() => {
    setChecked(isChecked ?? false);
  }, [isChecked]);
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={changeChecked}
        checked={checked}
      />
      <div
        className={`${
          option?.dark
            ? "w-[80px] h-[30px] after:h-[25px] after:w-[25px] peer-checked:after:translate-x-[50px]"
            : "w-[100px] h-[40px] after:h-[35px] after:w-[35px] peer-checked:after:translate-x-[60px]"
        } bg-[#D3D3D3] rounded-full peer peer-focus:ring-0 dark:bg-gray-700 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-black`}
      />
      {option?.dark && (
        <span
          className={`absolute left-[50%] transition-transform translate-x-[-50%] text-sm font-medium ${TEXT_COLOR.primary} dark:text-gray-300`}
        >
          {checked ? "Dark" : "Light"}
        </span>
      )}
    </label>
  );
};

export default Toggle;
