import { expect } from "chai";
import hre from "hardhat";
import { deploySystemToken, deployMyGovernor, createFirstPropose, createSecondPropose, createChangeWrapPropose, createAddDaoPropose, castVote, buyWrap, delegateWrap, cancel } from "./Calls.js";

let ethers;
let networkHelpers;

let myGovernor;
let systemToken;

let tom;
let ben;
let rick;
let jack;
let startup;

let firstPropose;
let secondPropose;

let tomBalance;
let benBalance;
let rickBalance;
let jackBalance;

let thirdPropose;
let forthPropose;

describe("solution demonstration testing", () => {
  before(async () => {
    ({ ethers, networkHelpers } = await hre.network.connect());
    [tom, ben, rick, jack, startup] = await ethers.getSigners();
    await networkHelpers.setBalance(tom.address, 1000000000000000000000000);
    await networkHelpers.setBalance(ben.address, 1000000000000000000000000);
    await networkHelpers.setBalance(rick.address, 1000000000000000000000000);
    await networkHelpers.setBalance(jack.address, 1000000000000000000000000);

    systemToken = await deploySystemToken(ethers, tom, ben, rick);
    const ethValue = ethers.parseEther("100");
    myGovernor = await deployMyGovernor(ethers, systemToken, jack, startup, { value: ethValue });
  });

  it("1. contracts are deployed with properAddresses", async function () {
    expect(systemToken.target).to.be.properAddress;
    expect(myGovernor.target).to.be.properAddress;
  });

  it("2. should be possible to create first proposal", async () => {
    firstPropose = await createFirstPropose(tom, 10000n * 10n ** 18n, 5n);
  });

  it("3. ben should be possible to vote for first proposal", async () => {
    await castVote(firstPropose, ben, 1, 90n);
  });

  it("4. rick should be possible to vote for first proposal", async () => {
    await castVote(firstPropose, rick, 0, 60n);
  });

  it("5. tom should be possible to vote for first proposal", async () => {
    await castVote(firstPropose, tom, 1, 120n);
  });

  it("6. should be possible to execute first proposal", async () => {
    await networkHelpers.mine(10);
    await myGovernor.connect(tom).myExecute(firstPropose);
  });

  it("7. should be possible to create second propose", async () => {
    secondPropose = await createSecondPropose(rick, 5000n * 10n ** 18n, 20n);
  });

  it("8. should be possible to vote for second proposal", async () => {
    tomBalance = await myGovernor.connect(tom).viewMyBalances();
    benBalance = await myGovernor.connect(ben).viewMyBalances();
    rickBalance = await myGovernor.connect(rick).viewMyBalances();
    jackBalance = await myGovernor.connect(jack).viewMyBalances();

    await castVote(secondPropose, tom, 1, 900n);
  });

  it("9. should be possible to vote for second proposal", async () => {
    await castVote(secondPropose, ben, 0, 600);
  });

  it("10. should be possible to buy and delegate wrap token to tom", async () => {
    const response = await myGovernor.viewProposal(secondPropose);

    const value = await ethers.parseEther("1000");
    await buyWrap(jack, value);

    jackBalance = await myGovernor.connect(jack).viewMyBalances();
    await delegateWrap(jack, secondPropose, ben);

    const responseTwo = await myGovernor.viewProposal(secondPropose);

    expect(response[9] + jackBalance[1] / 6n).to.eq(responseTwo[9]);
  });

  it("11. should be possible to cancel proposal", async () => {
    await cancel(rick, secondPropose);

    const tomBalanceAfter = await myGovernor.connect(tom).viewMyBalances();
    const benBalanceAfter = await myGovernor.connect(ben).viewMyBalances();
    const rickBalanceAfter = await myGovernor.connect(rick).viewMyBalances();
    const jackBalanceAfter = await myGovernor.connect(jack).viewMyBalances();

    expect(tomBalanceAfter[0]).to.eq(tomBalance[0]);
    expect(benBalanceAfter[0]).to.eq(benBalance[0]);
    expect(rickBalanceAfter[0]).to.eq(rickBalance[0]);
    expect(jackBalanceAfter[1]).to.eq(jackBalance[1]);
  });

  it("12. should be possible to create third proposal", async () => {
    thirdPropose = await createChangeWrapPropose(rick, 12n, 5n);
  });

  it("13. should be possible to vote for third proposal", async () => {
    await castVote(thirdPropose, rick, 1, 1200n);
  });

  it("14. should be possible to vote for third proposal", async () => {
    await castVote(thirdPropose, tom, 1, 1000n);
  });

  it("15. should be possible to create forth proposal", async () => {
    forthPropose = await createAddDaoPropose(tom, jack, 5n);
  });

  it("16. should be possible to vote for forth proposal", async () => {
    await castVote(forthPropose, tom, 1, 300n);
    await castVote(forthPropose, ben, 1, 300n);
    await castVote(forthPropose, rick, 1, 300n);
  });

  it("17. should be possible to buy and delegate wrap token", async () => {
    let userInfo = await myGovernor.connect(jack).viewUserInfo();

    const value = await ethers.parseEther("1200");
    await buyWrap(jack, value);
    await delegateWrap(jack, forthPropose, tom);

    userInfo = await myGovernor.connect(jack).viewUserInfo();
  });

  it("18. should be possible to execute last two proposals", async () => {
    // let userInfo = await myGovernor.connect(jack).viewUserInfo();
    // let response = userInfo[0] === 2n ? "he is dao now" : "not dao yet";
    // console.log(response);

    await networkHelpers.mine(10);
    await myGovernor.connect(rick).myExecute(thirdPropose);
    await myGovernor.connect(tom).myExecute(forthPropose);

    // userInfo = await myGovernor.connect(jack).viewUserInfo();
    // response = userInfo[0] === 2n ? "he is dao now" : "not dao yet";
    // console.log(response);
  });
});

export { myGovernor };
