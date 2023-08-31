import React from "react";

const styles = {
  wrapper: `flex justify-between mb-[20px]`,
  arrow: `text-[#967AC3] px-2`,
  month: `text-center text-xl font-bold`,
};

const month = Array.from({ length: 12 }, (_, i) => i + 1);

interface HeaderProps {
  selectedYear: number;
  selectedMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedYear,
  selectedMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.arrow} onClick={prevMonth}>
        &#10094;
      </button>
      <div className={styles.month}>
        {selectedYear}. {month[selectedMonth - 1]}
      </div>
      <button className={styles.arrow} onClick={nextMonth}>
        &#10095;
      </button>
    </div>
  );
};

export default Header;
