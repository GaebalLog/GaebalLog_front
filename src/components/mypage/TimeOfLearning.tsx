import React from "react";

import Button from "../designSystem/Button";

const TimeOfLearning: React.FC<{ category: timeOfLearning }> = ({
  category,
}) => {
  return (
    <div
      key={`mypage${category.category}`}
      className="category flex justify-between items-center gap-[16px] h-[60px] px-[16px] py-[8px] text-[16px]"
    >
      <Button
        size="myCategory"
        color="white"
        rounded
        border
        className="flex items-center cursor-default"
      >
        # {category.category}
      </Button>
      <span>{category.timespent}</span>
    </div>
  );
};

export default TimeOfLearning;
