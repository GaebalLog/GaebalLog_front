"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { MutableSnapshot } from "recoil";
import { RecoilRoot } from "recoil";

const Provider: React.FC<{
  children: React.ReactNode;
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}> = ({ children, initializeState }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default Provider;
