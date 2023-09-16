import React from "react";

const styles = {
  checkBoxDiv: `flex items-center -mt-[5px]`,
  checkBox: `flex items-center justify-center w-5 h-5 border-2 border-[#967AC3] bg-transparent text-[#967AC3] cursor-pointer`,
};

const CheckBox: React.FC<{
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsConfirm }) => {
  return (
    <div className={styles.checkBoxDiv}>
      <input type="checkbox" id="agree" className="hidden" />
      <label
        htmlFor="agree"
        data-testid="agree"
        className={styles.checkBox}
        onClick={() => setIsConfirm((prev) => !prev)}
      >
        <svg
          className="w-[14px] h-4 fill-current hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </label>
      <span className="ml-2">회원가입에 동의 하겠습니까?</span>
    </div>
  );
};

export default CheckBox;
