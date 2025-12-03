import { ethers } from "ethers";
import abi from "./abi.json";

class GovernorService {
  contractAddress = "0x537e697c7AB75A26f9ECF0Ce810e3154dFcaaf44";
  provider;
  signer;
  contract;

  init = async () => {
    this.provider = await new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = await new ethers.Contract(this.contractAddress, abi, this.signer);
  };

  connect = async () => {
    if (!this.contract) {
      await this.init();
    }
    return await this.signer.getAddress();
  };

  disconnect = async () => {
    this.signer = null;
    this.contract = null;
  };

  viewUserInfo = async () => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.viewUserInfo();
  };

  viewMyBalances = async () => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.viewMyBalances();
  };

  getAllProposalIds = async () => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.getAllProposalIds();
  };

  viewProposal = async (id) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.viewProposal(id);
  };

  getState = async (id) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.state(id);
  };

  create_A_of_B_propose = async (target, value, period) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.create_A_of_B_propose(target, value, period);
  };

  create_C_or_D_propose = async (user, simpleMost, adding, _period) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.create_C_or_D_propose(user, simpleMost, adding, _period);
  };

  create_E_or_F_propose = async (simpleMost, _system, _newDenominator, _period) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.create_E_or_F_propose(simpleMost, _system, _newDenominator, _period);
  };

  myCastVote = async (proposalId, support, amount) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.myCastVote(proposalId, support, amount);
  };

  myExecute = async (proposalId) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.myExecute(proposalId);
  };

  cancel = async (proposalId) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.cancel(proposalId);
  };

  buyWrapToken = async (value) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.buyWrapToken({ value: ethers.parseEther(value) });
  };

  delegateWrapToken = async (proposalId, delegateTo) => {
    if (!this.contract) {
      await this.init();
    }
    return await this.contract.delegateWrapToken(proposalId, delegateTo);
  };
}

export default new GovernorService();
