import React from "react";

interface usePaginationReturnType<T extends string[] | timeOfLearning[]> {
  isFirstPage: boolean;
  isLastPage: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  slicedMyCategories: T;
}

const usePagination = <T extends string[] | timeOfLearning[]>(
  data: T,
  containerRef: React.MutableRefObject<
    HTMLUListElement | HTMLDivElement | null
  >,
): usePaginationReturnType<T> => {
  const [remainingCategoryCount, setRemainingCategoryCount] = React.useState(0);
  const [renderedItemCount, setRenderedItemCount] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [renderedItemCountArray, setRenderedItemCountArray] = React.useState<
    number[]
  >([]);

  const slicedMyCategories = data?.slice(index) as T;
  const isFirstPage = remainingCategoryCount === data?.length;
  const isLastPage = index + renderedItemCount === data?.length;

  const handleNext = () => {
    setIndex((prev) => prev + renderedItemCount);
    setRemainingCategoryCount((prev) =>
      prev > 0 ? prev - renderedItemCount : 0,
    );
    setRenderedItemCountArray((prev) => [...prev, renderedItemCount]);
  };

  const handlePrev = () => {
    const lastRenderedItemCount =
      renderedItemCountArray[renderedItemCountArray?.length - 1];
    setIndex((prev) => prev - lastRenderedItemCount);
    setRemainingCategoryCount((prev) => prev + lastRenderedItemCount);
    setRenderedItemCountArray((prev) => {
      prev.pop();
      return prev;
    });
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const totalMyCategories = Array.from(
        container.getElementsByClassName("category"),
      ) as HTMLDivElement[];
      const renderedItems = totalMyCategories.filter(
        (item) => item.offsetTop < container.clientHeight,
      );
      setRenderedItemCount(renderedItems.length);
    }
  }, [data, index, containerRef]);

  React.useEffect(() => {
    setRemainingCategoryCount(slicedMyCategories?.length);
    if (slicedMyCategories?.length === 0 && index > 0) {
      handlePrev();
    }
  }, [slicedMyCategories]);

  return {
    isFirstPage,
    isLastPage,
    handlePrev,
    handleNext,
    slicedMyCategories,
  };
};

export default usePagination;
