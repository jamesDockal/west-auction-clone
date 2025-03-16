import { Check } from "lucide-react";
import React from "react";

type Props = {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  label: string;
};

export const CheckBox: React.FC<Props> = ({
  isChecked,
  label,
  setIsChecked,
}) => {
  return (
    <div
      className="cursor-pointer flex items-center gap-[7px] h-[38px]"
      onClick={() => setIsChecked(!isChecked)}
    >
      <div
        className={`w-[16px] h-[16px] rounded-[4px] flex items-center justify-center
            ${
              isChecked
                ? "bg-[#00B2FF]"
                : "bg-[#F3F5F7] border border-[#E8ECEF]"
            }
            `}
      >
        {isChecked && <Check className="text-white w-[10px] h-[10px]" />}
      </div>
      {label}
    </div>
  );
};
