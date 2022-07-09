import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TransactionContext } from "../context/TransactionContext";
import uniswapLogo from "../Assets/uniswap.png";
import ethLogo from "../Assets/ethCurrency.png"


const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  left: `flex`,
  headerLogo: "flex w-1/4 items-center justify-start",
  nav: "flex-1 flex justify-center items-center",
  navItemContainer: "flex bg-[#FFF] rounded-3xl text-black",
  navItem: "px-4 m-1 flex items-center text-md font-semibold rounded-2xl",
  activeNavItem: "bg-[#F7F8FA]",
  buttonsContainer: "flex  justify-end items-center",
  button:
    "flex items-center bg-[#FFF] rounded-2xl mx-2 text-[0.9rem] text-black font-semibold cursor-pointer",
  buttonPadding: "px-2 py-1",
  buttonTextContainer: "h-8 flex items-center",
  buttonIconContainer: "flex items-center justify-center w-8 h-8",
  buttonAccent:
    "bg-[#F7F8FA] border hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-black",
};

export const Header = () => {
  const [selectedNav, setSelectedNav] = useState("swap");
  const { connectWallet, currentAccount, currentBalance } = useContext(TransactionContext);
  const [userName, setUserName] = useState();

  console.log(currentBalance);

  useEffect(() => {
  currentAccount && setUserName(`${currentAccount.slice(0,7)}...${currentAccount.slice(35)}`)
  }, [currentAccount])
  
  

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
      <div className={style.headerLogo}>
        <Image src={uniswapLogo} height={30} width={30} alt="uniswap-logo" />
      </div>
      <div className={`${style.nav} ml-6`}>
        <div className={style.navItemContainer}>
          <div
            onClick={() => {
              setSelectedNav("swap");
            }}
            className={`${style.navItem} ${
              selectedNav === "swap" && style.activeNavItem
            }`}
          >
            Swap
          </div>
          <div
            onClick={() => {
              setSelectedNav("pool");
            }}
            className={`${style.navItem} ${
              selectedNav === "pool" && style.activeNavItem
            }`}
          >
            Pool
          </div>

          <a
            href="https://info.uniswap.org/#/"
            target={"_blank"}
            rel="noreferrer"
            >
            <div className="px-4 py-2 m-1 flex items-center text-md font-semi">
              Charts <FiArrowUpRight/>
            </div>
          </a>
        </div>
      </div>

      </div>

      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={style.buttonIconContainer}>
            <Image src={ethLogo} alt="alt logo" height={20} width={20} />
          </div>
          <p>Ethereum</p>

          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div
            className={`${style.button} ${style.buttonPadding}`}
          > {currentBalance}
            <div className={`${style.buttonAccent} ${style.buttonPadding} ml-2`}>
              {" "}
              {userName}
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              {" "}
              Connect Wallet
            </div>
          </div>
        )}

        <div className={`${style.button} ${style.buttonPadding}`}>
          <div className={`${style.buttonIconContainer}`}>
            <HiOutlineDotsHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};
