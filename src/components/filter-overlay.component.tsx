import React from "react";
import { CheckBox } from "./checkbox.component";

type Props = {
  filters: {
    [key: string]: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setFilters: Function;
};

export const FilterOverlay: React.FC<Props> = ({ filters, setFilters }) => {
  const filtersKeys = Object.keys(filters);

  const handleCheckBoxClick = (key: string, newValue: boolean) => {
    setFilters({
      ...filters,
      [key]: newValue,
    });
  };

  return (
    <div
      className="absolute top-0 w-[146px] h-[134px] p-[10px] rounded-[8px] bg-white z-10"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {filtersKeys.map((key) => (
        <CheckBox
          key={key}
          isChecked={filters[key]}
          label={key}
          setIsChecked={(newValue) => handleCheckBoxClick(key, newValue)}
        />
      ))}
    </div>
  );
};
