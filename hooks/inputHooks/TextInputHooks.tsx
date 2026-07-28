"use client";
import { useState } from "react";

const TextInputHooks = () => {
  const [text, setText] = useState<number>();

  const textChangeHandler = (value: number) => {
    // if (validation) {
    //   const validationResult = validation?.();
    //   if (validationResult) {
    //     return setText(value);
    //   } else return;
    // }

    if (typeof value === "number") {
      setText(value);
    } else {
      return;
    }
  };
  return { text, textChangeHandler };
};

export default TextInputHooks;
