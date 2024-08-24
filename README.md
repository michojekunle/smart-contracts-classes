# Area Calculator Smart Contract

## Overview

The `AreaCalculator` smart contract allows users to compute the area of various geometric shapes, including rectangles, squares, and triangles. It is implemented in Solidity and designed to be deployed on the Ethereum blockchain.

## Features

- **Rectangle Area Calculation**: Computes the area of a rectangle based on provided length and breadth.
- **Square Area Calculation**: Computes the area of a square given the length of one side.
- **Triangle Area Calculation**: Computes the area of a triangle based on the base and height.

## Running Locally

### Prerequisites

- **Node.js** and **npm** installed.
- **Hardhat** installed in your project.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/michojekunle/AreaCalculatorContract.git
   cd area-calculator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

### Running the Contract

You can interact with the contract locally using Hardhat's built-in network.

1. **Compile the Contract**

   ```bash
   npx hardhat compile
   ```

## Testing

### Writing Tests

Tests are written using the Hardhat testing framework. Create a test file in the `test` directory:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AreaCalculator", function () {
    let areaCalculator;

    beforeEach(async function () {
        const AreaCalculator = await ethers.getContractFactory("AreaCalculator");
        areaCalculator = await AreaCalculator.deploy(); // Deploys the contract
    });

    it("should calculate the area of a rectangle correctly", async function () {
        const length = 10;
        const breadth = 5;
        const expectedArea = length * breadth;

        const result = await areaCalculator.calculateRectangleArea(length, breadth);
        expect(result).to.equal(expectedArea);
    });

    //more tests...
});
```

### Running Tests

Run the tests using:

```bash
npx hardhat test
```

## Deployment and Verification

### Deploying to a Live Network

To deploy the contract to a live network like sepolia:
1. **Update Hardhat Configuration**

   Ensure your `hardhat.config.js` is set up with your network details:

   ```javascript
    require('dotenv').config();
    require("@nomicfoundation/hardhat-toolbox");
    
    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
      solidity: "0.8.24",
      networks: {
        sepolia: {
          url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
          accounts: [process.env.WALLET_KEY],
        }
      },
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
      }  
    };
   ```
   in your `.env` set up your environment variables
   ```env
    WALLET_KEY=<your-wallet-private-key>
    ETHERSCAN_API_KEY=<your-etherscan-api-key>
    INFURA_ID=<your-infure-id>
   ```
3. **Deploy and verify the Contract**

   ```bash
   npx hardhat ignition deploy ./ignition/modules/AreaCalculator.js --network sepolia --verify
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and add tests if necessary.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.
