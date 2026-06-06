"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 사용자가 네트워크 상태가 다시 좋아졌을 때 자동 리패치 (기본값: true)
      refetchOnMount: false,
      refetchOnReconnect: true,
      // 데이터가 갱신되면 최신 데이터를 자동으로 리패치하지 않음 (기본값: true)
      refetchOnWindowFocus: true,
      // 재시도 횟수: X (기본값: 3회)
      retry: false,
      // stale 시간: 0분 (기본값: 0ms)
      staleTime: 0,
      // cache 시간: 0분 (기본값: 0ms)
      gcTime: 0,
    },
    mutations: {
      // 기본적으로 재시도 안 함 (기본값: 0회)
      retry: 0,
    },
  },
});

export const QueryProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
