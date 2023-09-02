import React from "react";

const usePagination = (
  data: string[],
  ref: React.MutableRefObject<HTMLUListElement | null>,
) => {
  const [remainingCategoryCount, setRemainingCategoryCount] = React.useState(0);
  const [renderedItemCount, setRenderedItemCount] = React.useState(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [renderedItemCountArray, setRenderedItemCountArray] = React.useState<
    number[]
  >([]);

  const slicedMyCategories = data.slice(startIndex);
  const isFirsPage = remainingCategoryCount === data.length;
  const isLastPage = startIndex + renderedItemCount < data.length;

  const handleNext = () => {
    setStartIndex((prev) => prev + renderedItemCount);
    setRemainingCategoryCount((prev) =>
      prev > 0 ? prev - renderedItemCount : 0,
    );
    setRenderedItemCountArray((prev) => [...prev, renderedItemCount]);
  };

  const handlePrev = () => {
    const lastRenderedItemCount =
      renderedItemCountArray[renderedItemCountArray.length - 1];
    setStartIndex((prev) => prev - lastRenderedItemCount);
    setRemainingCategoryCount((prev) => prev + lastRenderedItemCount);
    setRenderedItemCountArray((prev) => {
      prev.pop();
      return prev;
    });
  };

  React.useEffect(() => {
    const container = ref.current;
    if (container) {
      const totalMyCategories = Array.from(
        container.getElementsByClassName("category"),
      ) as HTMLDivElement[];
      const renderedItems = totalMyCategories.filter(
        (item) => item.offsetTop < container.clientHeight,
      );
      setRenderedItemCount(renderedItems.length);
    }
  }, [data, startIndex, ref]);

  React.useEffect(() => {
    setRemainingCategoryCount(data.length);
  }, [data]);

  return { isFirsPage, isLastPage, handlePrev, handleNext, slicedMyCategories };
};

export default usePagination;
