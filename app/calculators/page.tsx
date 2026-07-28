import React from "react";
import Link from "next/link";

const CalculatorsPage = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Link
        href="/calculators/dca"
        className="p-3 border-blue-400 border-[1px] rounded-2xl"
      >
        적립식 계산기
      </Link>
      <Link
        href="/calculators/dividend"
        className="p-3 border-blue-600 border-[1px] rounded-2xl"
      >
        배당 계산기
      </Link>
      <span className="p-3 border-blue-600 border-[1px] rounded-2xl">
        목표 배당 계산기
      </span>
      <span className="p-3 border-blue-600 border-[1px] rounded-2xl">
        FIRE 배당 계산기
      </span>
      <span className="p-3 border-blue-600 border-[1px] rounded-2xl">
        환율 수익 계산기
      </span>
      <span className="p-3 border-blue-600 border-[1px] rounded-2xl">
        ISA 절세 계산기
      </span>
    </div>
  );
};

export default CalculatorsPage;
