import React from "react";

interface usePaginationReturnType<
  T extends { keyword: string }[] | timeOfLearning[],
> {
  isFirstPage: boolean;
  isLastPage: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  slicedMyCategories: T;
}

const usePagination = <T extends { keyword: string }[] | timeOfLearning[]>(
  data: T,
  containerRef: React.MutableRefObject<
    HTMLUListElement | HTMLDivElement | null
  >,
): usePaginationReturnType<T> => {
  const [renderedItemCount, setRenderedItemCount] = React.useState(0);
  const [dataLength, setDataLength] = React.useState(data?.length);
  const [index, setIndex] = React.useState(0);
  const [renderedItemCountArray, setRenderedItemCountArray] = React.useState<
    number[]
  >([]);

  const slicedMyCategories = data?.slice(index) as T;
  const isFirstPage = index === 0;
  const isLastPage = index + renderedItemCount === dataLength;

  const handleNext = () => {
    setIndex((prev) => prev + renderedItemCount);
    setRenderedItemCountArray((prev) => [...prev, renderedItemCount]);
  };

  const handlePrev = () => {
    const lastRenderedItemCount =
      renderedItemCountArray[renderedItemCountArray?.length - 1];
    setIndex((prev) => prev - lastRenderedItemCount);
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
      setDataLength(data?.length);
    }
  }, [data, index, containerRef]);

  React.useEffect(() => {
    if (slicedMyCategories?.length === 0 && index > 0) handlePrev();
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
