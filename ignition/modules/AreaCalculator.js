const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AreaCalculatorModule", (m) => {
  // Deploy the AreaCalculator contract
  const areaCalculator = m.contract("AreaCalculator");

  return {
    areaCalculator, // Return the deployed contract instance
  };
});
