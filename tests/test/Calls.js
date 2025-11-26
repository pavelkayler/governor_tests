import { myGovernor } from "./MyGovernor.test";

export async function deploySystemToken(ethers, tom, ben, rick) {
  const SystemToken = await ethers.getContractFactory("SystemToken");
  const systemToken = await SystemToken.deploy(tom, ben, rick);
  await systemToken.waitForDeployment();
  return systemToken;
}

export async function deployMyGovernor(ethers, systemToken, jack, startup) {
  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const toSend = await ethers.parseEther("100000");
  const myGovernor = await MyGovernor.deploy(systemToken, jack, startup, { value: toSend });
  await myGovernor.waitForDeployment();
  return myGovernor;
}

export async function createFirstPropose(proposer, number, period) {
  await myGovernor.connect(proposer).create_A_of_B_propose(myGovernor, number, period);
  return await myGovernor.getProposalId(0);
}

export async function createSecondPropose(proposer, number, period) {
  await myGovernor.connect(proposer).create_A_of_B_propose(myGovernor, number, period);
  return await myGovernor.getProposalId(1);
}

export async function createChangeWrapPropose(proposer, number, period) {
  await myGovernor.connect(proposer).create_E_or_F_propose(true, false, number, period);
  return await myGovernor.getProposalId(2);
}

export async function createAddDaoPropose(proposer, user, period) {
  await myGovernor.connect(proposer).create_C_or_D_propose(user, false, true, period);
  return await myGovernor.getProposalId(3);
}

export async function castVote(proposalId, dao, support, amount) {
  await myGovernor.connect(dao).myCastVote(proposalId, support, amount);
}

export async function buyWrap(sender, value) {
  await myGovernor.connect(sender).buyWrapToken({ value: value });
}

export async function delegateWrap(sender, proposalId, delegateTo) {
  await myGovernor.connect(sender).delegateWrapToken(proposalId, delegateTo);
}

export async function cancel(sender, proposalId) {
  await myGovernor.connect(sender).cancel(proposalId);
}
