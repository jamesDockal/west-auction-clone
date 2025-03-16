import { Lock, Menu } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "./search.component";

export const Header: React.FC = () => {
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white text-black h-[53px] sm:h-[50px] px-6 sm:px-8 w-full p-3">
      <div
        className={`transition-all duration-300 sm:hidden ${
          isSearchBarFocused ? "w-0 opacity-0" : "w-[24px]"
        }`}
      >
        <Menu className="text-[#394046]" />
      </div>

      <div
        className={`transition-all duration-300 sm:flex justify-center items-center sm:w-[238px] h-[38px] sm:h-[50px] ${
          isSearchBarFocused
            ? "w-0 sm:w-[180px] h-[0px] sm:h-[38px] opacity-0 sm:opacity-100"
            : "w-[180px]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>

      <div
        className={`
        transition-all duration-300 flex items-center sm:w-[659px] gap-[30px]
        ${isSearchBarFocused && "flex-1 sm:flex-none"}
        `}
      >
        <Search isFocusedCallback={setIsSearchBarFocused} />

        <div
          className={`hidden sm:flex items-center transition-all duration-100 gap-[30px] overflow-hidden ${
            isSearchBarFocused ? "w-0 opacity-0 absolute" : "w-full"
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

      <div className="hidden sm:flex items-center gap-[30px]">
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
