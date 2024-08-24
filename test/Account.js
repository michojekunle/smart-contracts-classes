const { expect } = require("chai");

describe("AccountContract", function () {
  let AccountContract;
  let accountContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    AccountContract = await ethers.getContractFactory("AccountContract");
    [owner, addr1, addr2] = await ethers.getSigners(); //ethers is in the global state
    accountContract = await AccountContract.deploy(); // deploys the contract
  });

  it("should create an account", async function () {
    await accountContract.connect(addr1).createAccount("Alice");
    const balance = await accountContract.getBalance({ from: addr1.address });

    expect(balance).to.equal(0);
  });

  it("should not allow duplicate accounts", async function () {
    await accountContract.connect(addr1).createAccount("Alice");

    await expect(
      accountContract.connect(addr1).createAccount("Alice")
    ).to.be.revertedWith("User account already exists");
  });

  it("should deposit ether", async function () {
    await accountContract.connect(addr1).createAccount("Alice");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    const balance = await accountContract.getBalance({ from: addr1.address });

    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("should withdraw ether", async function () {
    await accountContract.connect(addr1).createAccount("Alice");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    await accountContract.connect(addr1).withdraw(ethers.parseEther("0.5"));

    const balance = await accountContract.getBalance({ from: addr1.address });

    expect(balance).to.equal(ethers.parseEther("0.5"));
  });

  it("should fail to withdraw more than balance", async function () {
    await accountContract.connect(addr1).createAccount("Alice");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    await expect(
      accountContract.connect(addr1).withdraw(ethers.parseEther("2"))
    ).to.be.revertedWith("Not enough balance");
  });

  it("should transfer ether to another account", async function () {
    await accountContract.connect(addr1).createAccount("Alice");
    await accountContract.connect(addr2).createAccount("Bob");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    await accountContract
      .connect(addr1)
      .transferToAddr(ethers.parseEther("0.5"), addr2.address);

    const balanceAddr1 = await accountContract.getBalance({
      from: addr1.address,
    });
    const balanceAddr2 = await accountContract.getBalance({
      from: addr2.address,
    });

    expect(balanceAddr1).to.equal(ethers.parseEther("0.5"));
    expect(balanceAddr2).to.equal(ethers.parseEther("0.5"));
  });

  it("should fail to transfer more than balance", async function () {
    await accountContract.connect(addr1).createAccount("Alice");
    await accountContract.connect(addr2).createAccount("Bob");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    await expect(
      accountContract
        .connect(addr1)
        .transferToAddr(ethers.parseEther("2"), addr2.address)
    ).to.be.revertedWith("Not enough balance for transfer");
  });

  it("should fail to transfer to self", async function () {
    await accountContract.connect(addr1).createAccount("Alice");

    await accountContract
      .connect(addr1)
      .deposit({ value: ethers.parseEther("1") });

    await expect(
      accountContract
        .connect(addr1)
        .transferToAddr(ethers.parseEther("0.5"), addr1.address)
    ).to.be.revertedWith("You cannot transfer to yourself");
  });
});
