import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../lib/constants";
import { ethers } from "ethers";
import { client } from "../lib/sanityClient";
import { useRouter } from "next/router";

export const TransactionContext = React.createContext();

let eth;

// Checks if Metamask is installed
if (typeof window !== "undefined") {
  eth = window.ethereum;
}

// Gets the ethereum contract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

// Fetches the connected account balance
const getBalance = async (account) => {
  const provider = new ethers.providers.Web3Provider(eth);
  const accBal = await provider.getBalance(account).then((balance) => {
    // convert a currency unit from wei to ether
    const balanceInEth = Number(ethers.utils.formatEther(balance)).toFixed(4);
    console.log(`balance: ${balanceInEth} ETH`);
    return balanceInEth;
  });
  return accBal;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [currentBalance, setCurrentBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });
  const [txSuccessful, setTxSuccessful] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState();

  const router = useRouter();

  const clearFormData = () => {
    setFormData({ addressTo: "", amount: "" });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [txSuccessful]);

  useEffect(() => {
    currentAccount &&
      (async () => {
        const userDoc = {
          _type: "users",
          _id: currentAccount,
          username: "Unnamed",
          address: currentAccount,
        };

        await client.createIfNotExists(userDoc);
      })();
    getHistory();
  }, [currentAccount]);

  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push("/");
    }
  }, [isLoading]);

  // Gets Transaction History
  const getHistory = async () => {
    if (!isLoading && currentAccount) {
      const query = `*[_type=="users" && _id == "${currentAccount}"] {
              "transactionList" : transactions[] -> {amount, toAddress, timeStamp, txHash} | order(timeStamp desc) [0..4]
          }`;
      const clientRes = await client.fetch(query);
      setTransactionHistory(clientRes[0].transactionList);
    }
  };

  // Connects the wallet present in the metamask to the app
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please Install Metamask!");
      else {
        const accounts = await metamask.request({
          method: "eth_requestAccounts",
        });

        const accountBalance = await getBalance(accounts[0]);
        console.log(accountBalance);
        setCurrentBalance(`${accountBalance} ETH`);
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      // throw new Error("No Ethereum Object");
    }
  };

  // Check if Wallet is connected
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please Install Metamask!");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        const accountBalance = await getBalance(accounts[0]);
        setCurrentBalance(`${accountBalance} ETH`);
        setCurrentAccount(accounts[0]);
        await getHistory();
        console.log("Wallet Is already Connected");
      }
    } catch (error) {
      console.error(error);
      // throw new Error("No Ethereum Object");
    }
  };

  // Saves Transaction to Sanity
  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress
  ) => {
    const txDoc = {
      _type: "transactions",
      _id: txHash,
      fromAddress,
      toAddress,
      timeStamp: new Date(Date.now()).toISOString(),
      txHash,
      amount: parseFloat(amount),
    };

    await client.createIfNotExists(txDoc);
    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert("after", "transactions[-1]", [
        {
          _key: txHash,
          _ref: txHash,
          _type: "reference",
        },
      ])
      .commit();
    return;
  };

  // Communicates with the smart contract to call the publishTransaction Function
  const sendTransactions = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      console.log("function executed till this point");
      if (!metamask) return alert("Please Install Metamask!");
      else {
        const { addressTo, amount } = formData;
        const transactionContract = getEthereumContract();

        const parsedAmount = ethers.utils.parseEther(amount);

        await metamask.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: connectedAccount,
              to: addressTo,
              gas: "0x7EF400", //52000 Gwei
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionContract.publishTransaction(
          addressTo,
          parsedAmount,
          `Transferring ETH ${parsedAmount} to ${addressTo}`,
          "TRANSFER"
        );

        setIsLoading(true);

        await transactionHash.wait();

        await saveTransaction(
          transactionHash.hash,
          amount,
          connectedAccount,
          addressTo
        ).then(async () => {
          await getHistory();
        });
        setIsLoading(false);
        setTxSuccessful(!txSuccessful);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle change function that calls whenever any change occurs in any of the input fields.
  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(formData);
  };

 

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        currentBalance,
        connectWallet,
        sendTransactions,
        handleChange,
        formData,
        isLoading,
        txSuccessful,
        clearFormData,
        setFormData,
        transactionHistory,
      }}
    >
      {children}{" "}
    </TransactionContext.Provider>
  );
};
