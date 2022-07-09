const hre = require("hardhat");

const main = async() => {
    const transactionFactory = await hre.ethers.getContractFactory('Transaction');
    const transactionContract = await transactionFactory.deploy();

    await transactionContract.deployed();
    console.log('Transactions deployed to: ', transactionContract.address)

}
main()
.then(() => process.exit(0))
.catch((error) => {
//   console.error(error);
console.log(error.message)
  process.exit(1);
});