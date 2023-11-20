"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { MutableSnapshot } from "recoil";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";

import { queryClient } from "@/config/query_config";

import SettingsProvider from "./SettingsProvider";
const RequireLoginConfirm = dynamic(
  () => import("../UI/modals/RequireLoginConfirm"),
);

const Provider: React.FC<{
  children: React.ReactNode;
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}> = ({ children, initializeState }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initializeState}>
          <SettingsProvider>{children}</SettingsProvider>
          <div id="portal" />
          <RequireLoginConfirm />
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default Provider;
