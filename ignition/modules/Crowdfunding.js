const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CrowdfundingModule", (m) => {
  // Deploy the Crowdfunding contract
  const Crowdfunding = m.contract("Crowdfunding");

  return {
    Crowdfunding, // Return the deployed contract instance
  };
});
