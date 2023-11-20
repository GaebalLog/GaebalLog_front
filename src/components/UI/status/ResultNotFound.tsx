import React from "react";

const ResultNotFound = ({ data }: { data: number }) => {
  return (
    (data === 0 || !data) && (
      <div className="flex justify-center items-center h-full">No Result</div>
    )
  );
};

export default ResultNotFound;
