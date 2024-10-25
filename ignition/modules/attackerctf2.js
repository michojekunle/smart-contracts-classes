const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountModule", (m) => {
  // Deploy the AreaCalculator contract
  const targetAddress = "0x8D6B11D53A4CE78658d8335EafAa1e77A2FB101d";
  const attacker = m.contract("ChallengeTwoExploit", [targetAddress]);

  return {
    attacker, // Return the deployed contract instance
  };
});
