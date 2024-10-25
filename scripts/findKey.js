const { keccak256, toBeHex, AbiCoder } = require("ethers");

// Target hash to match
const targetHash = "0xd8a1c3b3a94284f14146eb77d9b0decfe294c3ba72a437151caae86c3c8b2070";

async function findMatchingKey() {
  for (let key = 0; key <= 65535; key++) {
    // Encode the uint16 key as per Solidity's `abi.encode`
    const encodedKey = AbiCoder.defaultAbiCoder().encode(["uint16"], [key]); // Pads to 2 bytes for uint16
    // Hash the encoded value
    const hash = keccak256(encodedKey);

    // Check if the hash matches the target
    if (hash === targetHash) {
      console.log(`Matching key found: ${key}`);
      return key;
    }
  }
  console.log("No matching key found in the uint16 range.");
  return null;
}

// Run the function
findMatchingKey();
