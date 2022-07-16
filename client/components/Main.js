import Image from "next/image";
import { RiSettings3Line } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import ethLogo from "../Assets/ethCurrency.png";
import { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import TransactionLoader from "./TransactionLoader";

Modal.setAppElement("#__next");


const Main = () => {
  
  const style = {
    wrapper: "w-screen flex items-center justify-center mt-12",
    content:
      "bg-[#F7F8FA] w-[30rem] rounded-3xl px-2 pt-2 pb-1 mb-6 shadow-2xl mx-2",
    formHeader:
      "px-2 pt-2 pb-1 flex items-center justify-between font-semibold text-xl text-black",
    transferPropContainer:
      "bg-[#F7F8FA] my-3 rounded-2xl px-6 py-4 text-3xl border border-[#C3C9D9] hover:border-[#20242A] flex justify-between",
    transferPropInput:
      "bg-transparent text-black placeholder:text-[#C3C9D9] outline-none mb-4 w-full text-2xl",
    currencySelector: "flex w-1/4",
    currencySelectorContent:
      "w-full h-min flex justify-between items-center bg-[#FFF] hover:bg-[#D0D0D0] rounded-2xl text-xl text-black font-medium cursor-pointer p-2 mt-[-0.2rem]",
    currencySelectorIcon: "flex items-center",
    currencySelectorTicket: "mx-2",
    currencySelectorArrow: "text-3xl",
    confirmButton:
      "bg-[#CF0063] hover:bg-[#CF0058] mt-2 mb-1 rounded-3xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]",
    connectWalletButton:
      "bg-[#FDEAF1] border hover:bg-[#FCDCE8] h-full rounded-2xl flex items-center justify-center text-[#BC005A] cursor-pointer text-lg font-semibold py-4 mt-2 mb-1",
  };
  
  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#DDD",
      width: "18rem",
      height: "16rem",
      margin: "auto",
      padding: 0,
      border: "none",
      borderRadius: "0.75rem",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };


  const {
    formData,
    handleChange,
    sendTransactions,
    setFormData,
    txSuccessful,
  } = useContext(TransactionContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount } = formData;
    if (!addressTo || !amount) return;
    else {
      await sendTransactions();
      // setFormData({addressTo: "", amount:""});
      // console.log("button was clicked")
    }
  };

  useEffect(() => {
    setFormData({ addressTo: "", amount: "" });
    // console.log(formData);
  }, [txSuccessful]);

  const { connectWallet, currentAccount, currentBalance } =
    useContext(TransactionContext);

  // console.log(formData);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Send</div>
          <div>
            <RiSettings3Line />{" "}
          </div>
        </div>
        <div className={style.transferPropContainer}>
          <input
            type={"text"}
            className={style.transferPropInput}
            pattern="[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            onChange={(e) => handleChange(e)}
            name="amount"
            value={formData.amount}
          />
          <div className={style.currencySelector}>
            <div className={style.currencySelectorContent}>
              <div className={style.currencySelectorIcon}>
                <Image src={ethLogo} alt="eth Logo" height={70} width={50} />
              </div>
              <div className={style.currencySelectorTicket}>ETH</div>
              <AiOutlineDown className={style.currencySelectorArrow} />
            </div>
          </div>
        </div>
        <div className={style.transferPropContainer}>
          <input
            type={"text"}
            className={style.transferPropInput}
            placeholder="0x..."
            onChange={(e) => handleChange(e)}
            name="addressTo"
            value={formData.addressTo}
          />
          <div className={style.currencySelector}> </div>
        </div>
        {currentAccount ? (
          <div className={style.confirmButton} onClick={(e) => handleSubmit(e)}>
            Confirm
          </div>
        ) : (
          <div
            className={style.connectWalletButton}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
        )}
      </div>
      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />
      </Modal>
    </div>
  );
};

export default Main;
