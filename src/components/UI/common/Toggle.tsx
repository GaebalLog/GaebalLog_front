import React from "react";
import { useRecoilState } from "recoil";

import { TEXT_COLOR } from "@/config/constants/colors";
import { darkAtom } from "@/hooks/useUserAuth";
import { authAPI } from "@/config/api/authAPI";
import { utilErrorCase } from "@/utils/util-errorCase";

interface props {
  onSuccess?: (checked?: boolean) => void;
  onFail?: (checked?: boolean) => void;
  option?: {
    dark?: boolean;
  };
  isChecked?: boolean;
}

const Toggle: React.FC<props> = ({ onSuccess, onFail, option, isChecked }) => {
  const [checked, setChecked] = React.useState(false);
  const [darkMode, setDarkMode] = useRecoilState(darkAtom);

  const makeChecked = () => {
    if (option?.dark) {
      setDarkMode(1);
    }
    onSuccess && onSuccess(checked);
  };

  const makeNonChecked = () => {
    if (option?.dark) {
      setDarkMode(0);
    }
    onFail && onFail(checked);
  };
  const changeChecked = async () => {
    try {
      await authAPI.darkMode(!checked);
      darkMode === 0 ? setDarkMode(1) : setDarkMode(0);
    } catch (error) {
      utilErrorCase((error as error).response.status);
    }
    setChecked((prev) => !prev);
    checked ? makeNonChecked() : makeChecked();
  };

  React.useEffect(() => {
    setChecked(isChecked ?? false);
    if (option?.dark) {
      setChecked(darkMode === 1 ? true : false);
    }
  }, [isChecked, darkMode]);

  React.useEffect(() => {
    if (darkMode === 1) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

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
