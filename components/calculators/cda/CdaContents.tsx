"use client";
import TextInput from "@/components/common/input/TextInput";
import TextInputHooks from "@/hooks/inputHooks/TextInputHooks";

const CdaContents = () => {
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

  return (
    <div>
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
        <span>{profitUtils()?.futureValue}</span>
        <span>{profitUtils()?.investedMoney}</span>
        <span>{profitUtils()?.profit}</span>
      </div>
    </div>
  );
};

export default CdaContents;
