require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/d33Ehet2i_KtilREVLu1nQTTBhOS8xnh',
      accounts: [
        'c57652d4f2aaa26ea2045d803969c38a920058def825ba5c3cc9a3b14db20ef7'
      ]
    }
  }
};
