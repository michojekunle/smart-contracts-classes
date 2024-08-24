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

    it("should calculate the area of a square correctly", async function () {
        const length = 5;
        const expectedArea = length * length;

        const result = await areaCalculator.calculateSquareArea(length);
        expect(result).to.equal(expectedArea);
    });

    it("should calculate the area of a triangle correctly", async function () {
        const base = 10;
        const height = 5;
        const expectedArea = (base * height) / 2;

        const result = await areaCalculator.calculateTriangleArea(base, height);
        expect(result).to.equal(expectedArea);
    });

    it("should return zero for triangle area when either base or height is zero", async function () {
        const base = 0;
        const height = 5;
        const expectedArea = 0;

        const result = await areaCalculator.calculateTriangleArea(base, height);
        expect(result).to.equal(expectedArea);

        const result2 = await areaCalculator.calculateTriangleArea(10, 0);
        expect(result2).to.equal(expectedArea);
    });
});
