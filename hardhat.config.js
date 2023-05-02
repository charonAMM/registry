/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
};

task ('hasher','Compile Poseidon hasher', () => {
  require('./scripts/compilePoseidon.js')
})
