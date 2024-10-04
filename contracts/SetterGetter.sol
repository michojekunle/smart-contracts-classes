// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SetterGetter {
    string name;

    function setName(string memory _name) external {
        name = _name; //using underscores for pramater names toprevent shadowing
    }

    function getName() external view returns(string memory) {
        return name;
    }
}