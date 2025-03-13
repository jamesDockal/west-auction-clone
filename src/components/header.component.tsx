import { Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "./search.component";

export const Header: React.FC = () => {
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white text-black h-[50px] px-8">
      <div className="flex justify-center items-center w-[238px] h-[50px]">
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>

      <div
        className="flex items-center w-[659px]"
        style={{
          gap: 30,
        }}
      >
        <Search isFocusedCallback={setIsSearchBarFocused} />
        <div
          className={`flex items-center transition-all duration-100 gap-[30px] overflow-hidden ${
            isSearchBarFocused && "w-0 opacity-0 absolute"
          }`}
        >
          <a className="whitespace-nowrap">Online Auctions</a>
          <a className="cursor-pointer text-primary whitespace-nowrap">
            How to Sell
          </a>
          <a className="cursor-pointer text-primary whitespace-nowrap">
            How to Bid
          </a>
          <a className="cursor-pointer text-primary">Appraisals</a>
        </div>
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="cursor-pointer flex items-center gap-[10px]">
          <div className="flex items-center justify-center w-8 h-8 gap-2.5 rounded-[20px] p-2 bg-gray-3">
            <Lock className="text-gray" />
          </div>
          <a className="text-primary">Login/Register</a>
        </div>
        <a className="cursor-pointer text-primary">Contact</a>
      </div>
    </div>
  );
};
