// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract AreaCalculator {
    uint256 public precision = 1e18;

    function calculateRectangleArea(
        uint256 length,
        uint256 breadth
    ) public pure returns (uint256) {
        return length * breadth;
    }

    function calculateSquareArea(uint256 length) public pure returns (uint256) {
        return length * length;
    }

    function calculateTriangleArea(
        uint256 base,
        uint256 height
    ) public view returns (uint256) {
        uint256 area = (base * height * precision) / 2;

        return area / precision;
    }
}
