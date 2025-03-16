import { Header } from "@/components/header.component";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>West Auction</title>
      </Head>
      <div className="px-0 sm:px-[76px] sm:margin-[10px]">
        <Header />
      </div>
    </>
  );
}
