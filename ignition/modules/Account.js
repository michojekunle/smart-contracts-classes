const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountModule", (m) => {
  // Deploy the AreaCalculator contract
  const accountCalculator = m.contract("AccountContract");

  return {
    accountCalculator, // Return the deployed contract instance
  };
});
