import type React from "react";

const mypageLiveSearchData = (
  categories: timeOfLearning[],
  setParticipatedList: React.Dispatch<React.SetStateAction<timeOfLearning[]>>,
) => {
  const timelessCategories = categories?.map(
    (item: timeOfLearning) => item.category,
  );

  const filterCategories = (searchkey: string) => {
    const fullList = categories;
    const selectedResult = fullList?.filter((item: timeOfLearning) =>
      item.category.includes(searchkey),
    );
    setParticipatedList(selectedResult);
  };
  return { timelessCategories, filterCategories };
};

export default mypageLiveSearchData;
