const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountModule", (m) => {
  // Deploy the AreaCalculator contract
  const challengeAddress = "0x771F8f8FD270eD99db6a3B5B7e1d9f6417394249";
  const attacker = m.contract("Attacker", [challengeAddress]);

  return {
    attacker, // Return the deployed contract instance
  };
});
