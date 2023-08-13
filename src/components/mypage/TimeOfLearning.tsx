import React from "react";

import Button from "../designSystem/Button";

const TimeOfLearning: React.FC<{ category: timeOfLearning }> = ({
  category,
}) => {
  return (
    <div
      key={`mypage${category.category}`}
      className="flex justify-between w-full h-[60px] px-[16px] py-[8px] text-[16px]"
    >
      <Button
        size="category"
        color="white"
        rounded
        border
        className="cursor-default"
      >
        # {category.category}
      </Button>
      <span>{category.timespent}</span>
    </div>
  );
};

export default TimeOfLearning;
