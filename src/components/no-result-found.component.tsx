import { SearchX } from "lucide-react";
import React from "react";

export const NoResultFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col m-auto">
      <div className="flex items-center gap-3 mb-3">
        <SearchX height={64} width={64} className="text-primary" />
        <span className="font-bold text-3xl">Sorry!</span>
      </div>
      <span className="text-gray-2 text-sm1">
        No result for your search was found
      </span>
    </div>
  );
};
