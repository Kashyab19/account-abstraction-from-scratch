require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.8.27",
    settings: {
      // shrinks the contracts size on run time
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  }
};
