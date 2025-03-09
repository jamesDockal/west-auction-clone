import { Lock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Search } from "./search.component";

export const Header: React.FC = () => {
  return (
    <div
      className="flex justify-around items-center bg-white text-black"
      style={{
        height: 50,
      }}
    >
      <div>
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
        className="flex items-center"
        style={{
          gap: 30,
        }}
      >
        <Search />
        <a className="font-semibold">Online Auctions</a>
        <a className="cursor-pointer font-semibold text-primary">How to Sell</a>
        <a className="cursor-pointer font-semibold text-primary">How to Bid</a>
        <a className="cursor-pointer font-semibold text-primary">Appraisals</a>
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
          <a className=" font-semibold text-primary">Login/Register</a>
        </div>
        <a className="cursor-pointer font-semibold text-primary">Contact</a>
      </div>
    </div>
  );
};
