"use client";
import TextInput from "@/components/common/input/TextInput";
import TextInputHooks from "@/hooks/inputHooks/TextInputHooks";
import { useState } from "react";
import "@/styles/calculators/calculationStyle.css";

const CdaContents = () => {
  const [result, setResult] = useState<
    {
      investedMoney: number;
      futureValue: string;
      profit: string;
    }[]
  >([]);

  const { text: monthlyMoney, textChangeHandler: monthlyMoneyHandler } =
    TextInputHooks();
  const { text: years, textChangeHandler: yearsHandler } = TextInputHooks();
  const { text: rate, textChangeHandler: rateHandler } = TextInputHooks();

  const profitUtils = () => {
    if (!monthlyMoney || !rate || !years) {
      return;
    }

    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const futureValue =
      monthlyMoney * (((1 + monthlyRate) ** months - 1) / monthlyRate);
    const investedMoney = monthlyMoney * months;
    return {
      investedMoney: Math.round(investedMoney),
      futureValue: Math.round(futureValue).toLocaleString(),
      profit: Math.round(futureValue - investedMoney).toLocaleString(),
    };
  };

  const addResult = () => {
    const result = profitUtils();
    if (!result) {
      return;
    }
    setResult((prev) => [...prev, result]);
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-md border border-gray-200">
      <div className="flex flex-col gap-3">
        <TextInput
          placeholder={"한달 투자 금액 (만)"}
          value={years}
          onChange={yearsHandler}
        />
        <TextInput
          placeholder={"투자 기간 (연)"}
          value={monthlyMoney}
          onChange={monthlyMoneyHandler}
        />
        <TextInput
          placeholder={"일년 이자 (%)"}
          value={rate}
          onChange={rateHandler}
        />

        <div className="flex gap-3">
          <span>총 금액 : {profitUtils()?.futureValue}</span>
          <span>투자 금액 : {profitUtils()?.investedMoney}</span>
          <span>이익 : {profitUtils()?.profit}</span>
        </div>
      </div>
      <div onClick={addResult}>더하기</div>

      <div>
        <table className="result-table">
          <thead>
            <tr>
              <th>년</th> <th>총 금액</th> <th>투자 금액</th> <th>이익</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.futureValue.toLocaleString()}</td>
                <td>{item.investedMoney.toLocaleString()}</td>
                <td>{item.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CdaContents;
