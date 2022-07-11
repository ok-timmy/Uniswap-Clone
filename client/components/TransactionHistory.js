import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import ethLogo from "../Assets/ethCurrency.png";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/router";

const style = {
  wrapper:
    "h-full bg-transparent text-white select-none w-screen flex-1 pt-14 flex items-end justify-end pb-12",
  txHistoryItem:
    "bg-[#FFF] text-black rounded-lg px-4 py-2 my-2 mr-8 flex items-center justify-end",
  txDetails: "flex items-center",
  toAddress: "text-[#f48706] mx-2",
  txTimestamp: "mx-2",
  etherscanlink: "flex items-center text-[#2172e5]",
};

const TransactionHistory = () => {
  const { isLoading, currentAccount, transactionHistory } =
    useContext(TransactionContext);
  // const [transactionHistory, setTransactionHistory] = useState();

 

  // useEffect(() => {
  //   async () => {
  //     await getHistory();
  //   };
  // }, [isLoading, currentAccount]);

  // const router = useRouter();
  

  // console.log(transactionHistory)

  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((transaction, index) => {
            return (
              <div className={style.txHistoryItem} key={index}>
                {" "}
                <div className={style.txDetails}>
                  <Image src={ethLogo} alt={"ethLogo"} width={15} height={20} />
                  {transaction.amount} sent To{" "}
                  <span className={style.toAddress}>
                    {transaction && transaction.toAddress.substring(0, 6)}
                  </span>
                </div>{" "}
                On{" "}
                <div className={style.txTimestamp}>
                  {new Date(transaction.timeStamp).toLocaleString("en-US", {
                    timeZone: "Europe/London",
                    hour12: true,
                    timeStyle: "short",
                    dateStyle: "long",
                  })}
                </div>
                <div className={style.etherscanlink}>
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className={style.etherscanlink}
                  >
                    View On Etherscan <FiArrowUpRight />{" "}
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TransactionHistory;
