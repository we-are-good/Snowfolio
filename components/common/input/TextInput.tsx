import Image from "next/image";
import React from "react";

type TextInputProps = {
  placeholder: string | React.ReactNode;
  image?: string;
  buttonText?: string | React.ReactNode;
  value: number | undefined;
  onChange: (value: number) => void;
};

const TextInput = ({
  placeholder,
  image,
  buttonText,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className="bg-white text-black">
      <span>
        <input
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </span>

      <span>{placeholder}</span>

      <div>
        {image && <Image src={image} alt="" width={24} height={24} />}
        {buttonText && <button>{buttonText}</button>}
      </div>
    </div>
  );
};

export default TextInput;
