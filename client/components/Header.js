import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TransactionContext } from "../context/TransactionContext";
import uniswapLogo from "../Assets/uniswap.png";
import ethLogo from "../Assets/ethCurrency.png"


 
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);
  
useEffect(() => {
  if(typeof window !== 'undefined') {
    const handleResize = ()=> {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return ()=> window.removeEventListener("resize", handleResize);
  }
}, []);

return windowWidth;

}


export const Header = () => {

  const width = useWindowWidth();
  // console.log(width);
  
  const style = {
    wrapper: `px-4 pt-3 w-screen flex justify-between items-center`,
    left: `flex`,
    headerLogo: `${!(width<= 640)? 'md:flex md:w-1/4 md:items-center md:justify-start' : 'xs:absolute xs:left-4 xs:top-4' }`,
    nav: `${!(width<= 640) ?' md:flex-1 md:flex md:justify-center md:items-center' : 'xs:absolute xs:bottom-6 xs:object-center' }`,
    navItemContainer: "flex bg-[#FFF] rounded-3xl text-black",
    navItem: "px-4 m-1 flex items-center cursor-pointer text-md font-semibold rounded-2xl hover:bg-[#F7F8FA]",
    activeNavItem: "bg-[#F7F8FA] cursor-pointer",
    buttonsContainer: "flex  justify-end items-center",
    button:
      "flex items-center bg-[#FFF] rounded-2xl mr-2 text-[1rem] text-black font-semibold cursor-pointer",
    buttonPadding: "px-1 py-1",
    buttonTextContainer: "h-8 flex items-center",
    buttonIconContainer: "flex items-center justify-center w-8 h-8",
    buttonAccent:
    "bg-[#FDEAF1] border hover:border-[#f591b6] h-full rounded-2xl flex items-center justify-center text-[#BC005A]",
  };

 
  const [selectedNav, setSelectedNav] = useState("swap");
  const { connectWallet, currentAccount, currentBalance } = useContext(TransactionContext);
  const [userName, setUserName] = useState();
  
  // console.log(currentBalance);
  
  
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
          {currentAccount && <div
            onClick={() => {
              setSelectedNav("vote");
            }}
            className={`${style.navItem} ${
              selectedNav === "pool" && style.activeNavItem
            }`}
          >
            Vote
          </div>}

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
          <p className={`${(width<640) &&'xs:hidden'}`}>Ethereum</p>

          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div
            className={`${style.button} ${style.buttonPadding}`}
          > <span className={`${(width<640) && "hidden"}`}>{ currentBalance} </span>
            <div className={`${style.buttonAccent} ${style.buttonPadding} ml-2`}>
              {" "}
              {userName}
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button}`}
            style={{padding:"2px"}}
          >
            <div id="connect" className={` ${style.buttonAccent} ${style.buttonPadding} px-3`} style={{padding:"7px 20px"}}>
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
