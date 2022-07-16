import Head from "next/head";
import Image from "next/image";
import { Header } from "../components/Header";
import Main from "../components/Main";
import TransactionHistory from "../components/TransactionHistory";

export default function Home() {
  const style = {
    wrapper: `h-screen h-max-screen h-min-screen w-screen bg-gradient-to-b from-[#F6EAF2] via-[#F7EEF5] to-white overflow-x-hidden text-white select-none flex flex-col justify-between`,
  };

  return (
    <>
      <Head>
        <title>Uniswap Clone App</title>
        <link rel="icon" href="/uniswap.ico" />
      </Head>
      <div className={style.wrapper}>
        <Header />
        <Main />
        <TransactionHistory />
      </div>
    </>
  );
}
