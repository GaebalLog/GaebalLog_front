import React from "react";

interface InfiniteScrollObserverProps {
  onIntersect: () => void;
  canLoad: boolean;
  threshold?: number;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollObserverProps> = ({
  onIntersect,
  canLoad,
  threshold = 0.7,
  children,
}) => {
  const loadMoreRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && canLoad) {
          onIntersect();
        }
      },
      {
        threshold: threshold,
      },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [canLoad]);

  return (
    <>
      {children}
      <div ref={loadMoreRef} />
    </>
  );
};

export default InfiniteScroll;
