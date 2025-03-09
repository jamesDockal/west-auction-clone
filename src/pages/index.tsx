import Image from "next/image";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header.component";

export default function Home() {
  return (
    <div
      style={{
        padding: "0px 76px",
      }}
    >
      <Header />
    </div>
  );
}
