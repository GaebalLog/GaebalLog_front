import React from "react";

const month = Array.from({ length: 12 }, (_, i) => i + 1 + " 월");

interface HeaderProps {
  selectedMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div className="flex justify-between mb-[20px]">
      <button className="text-[#967AC3] px-2" onClick={prevMonth}>
        &#10094;
      </button>
      <div className="text-center text-xl font-bold">
        {month[selectedMonth - 1]}
      </div>
      <button className="text-[#967AC3] px-2" onClick={nextMonth}>
        &#10095;
      </button>
    </div>
  );
};

export default Header;
