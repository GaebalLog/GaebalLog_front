import React from "react";

const CalculateWeek: React.FC = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="grid grid-cols-7">
      {week.map((v, i) => (
        <p key={i} className={`text-center`}>
          {v}
        </p>
      ))}
    </div>
  );
};

const Week = React.memo(CalculateWeek);
export default Week;
