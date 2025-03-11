import { Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "./search.component";

export const Header: React.FC = () => {
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  return (
    <div
      className="flex justify-between items-center bg-white text-black"
      style={{
        height: 50,
        padding: "0px 30px",
      }}
    >
      <div
        className="flex justify-center items-center"
        style={{
          width: 238,
          height: 50,
        }}
      >
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
          className={`flex items-center transition-all duration-300 ${
            isSearchBarFocused && "w-0 opacity-0"
          }`}
          style={{
            gap: 30,
          }}
        >
          <a className="font-semibold whitespace-nowrap">Online Auctions</a>
          <a className="cursor-pointer font-semibold text-primary whitespace-nowrap">
            How to Sell
          </a>
          <a className="cursor-pointer font-semibold text-primary whitespace-nowrap">
            How to Bid
          </a>
          <a className="cursor-pointer font-semibold text-primary">
            Appraisals
          </a>
        </div>
      </div>

      <div
        className="flex items-center"
        style={{
          gap: 30,
        }}
      >
        <div
          className="cursor-pointer flex items-center"
          style={{
            gap: 10,
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 gap-2.5 rounded-[20px] p-2 bg-gray-3">
            <Lock className="text-gray" />
          </div>
          <a className="font-semibold text-primary">Login/Register</a>
        </div>
        <a className="cursor-pointer font-semibold text-primary">Contact</a>
      </div>
    </div>
  );
};
