import Image from "next/image";
import {  RiSettings3Line } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import ethLogo from "../Assets/ethCurrency.png";
import { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import TransactionLoader from "./TransactionLoader";

Modal.setAppElement("#__next");

const style = {
  wrapper: "w-screen flex items-center justify-center mt-12 ",
  content: "bg-[#F7F8FA] w-[30rem] rounded-2xl p-4 mb-6 shadow-2xl",
  formHeader:
    "px-2 flex items-center justify-between font-semibold text-xl text-black",
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
    "bg-[#CF0063] my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]",
};

const customStyles = {
  content: {
    top: "10%",
    bottom: "auto",
    left: "40%",
    right: "auto",
    transform: "translate(-50% -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const Main = () => {
  const { formData, handleChange, sendTransactions, clearFormData, txSuccessful} =
    useContext(TransactionContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { addressTo, amount } = formData;
    if (!addressTo || !amount) return;
    else {
      await sendTransactions().then(()=> {clearFormData()});
      // setFormData({addressTo: "", amount:""});
      // console.log("button was clicked")
    }
  };

  // useEffect(() => {
  //  clearFormData();
  // }, [txSuccessful])
  
  

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Swap</div>
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
            onChange={(e) => handleChange(e, "amount")}
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
            onChange={(e) => handleChange(e, "addressTo")}
          />
          <div className={style.currencySelector}> </div>
        </div>
        <div className={style.confirmButton} onClick={(e) => handleSubmit(e)}>
          Confirm
        </div>
      </div>
      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />
      </Modal>
    </div>
  );
};

export default Main;
