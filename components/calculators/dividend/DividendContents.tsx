"use client";
import TextInput from "@/components/common/input/TextInput";
import TextInputHooks from "@/hooks/inputHooks/TextInputHooks";
import { useState } from "react";
import "@/styles/calculators/calculationStyle.css";

const DividendContents = () => {
  const [result, setResult] = useState<
    {
      investedMoney: number;
      years: number;
      dividend: string;
    }[]
  >([]);

  const { text: investedMoney, textChangeHandler: investedMoneyHandler } =
    TextInputHooks();
  const { text: years, textChangeHandler: yearsHandler } = TextInputHooks();

  const { text: dividerationRate, textChangeHandler: dividerationRateHandler } =
    TextInputHooks();

  const dividendUtils = () => {
    if (!investedMoney || !dividerationRate || !years) {
      return;
    }

    const dividend = investedMoney * (dividerationRate / 100) * years;
    return {
      investedMoney: Math.round(investedMoney),
      dividend: Math.round(dividend).toLocaleString(),
      years: years,
    };
  };

  const addResult = () => {
    const result = dividendUtils();
    if (!result) {
      return;
    }
    setResult((prev) => [...prev, result]);
  };

  return (
    <div className="flex flex-col gap-3 p-5 rounded-md border border-gray-200">
      <div className="flex flex-col gap-3">
        <TextInput
          placeholder={"총 투자 금액 (만)"}
          value={investedMoney}
          onChange={investedMoneyHandler}
        />
        <TextInput
          placeholder={"투자 기간 (연)"}
          value={years}
          onChange={yearsHandler}
        />
        <TextInput
          placeholder={"배당율 (%)"}
          value={dividerationRate}
          onChange={dividerationRateHandler}
        />

        <div className="flex gap-3">
          <span>배당 : {dividendUtils()?.dividend}</span>
        </div>
      </div>
      <div onClick={addResult}>더하기</div>

      <div>
        <table className="result-table">
          <thead>
            <tr>
              <th>번호</th> <th>년</th> <th>배당</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.years}</td>
                <td>{item.dividend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DividendContents;
