const contract = await ethers.getContractAt("AreaCalculator", "<DEPLOYED_CONTRACT_ADDRESS>");
const area = await contract.calculateRectangleArea(10, 5);
console.log(area.toString());