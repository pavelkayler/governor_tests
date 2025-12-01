import abi from "./abi.json";
import { ethers } from "ethers";

class GovernorServices {
  contractAddress = "0xcf950f044E11D2E0318314ecd940ec19abf51130";
  rpcProvider;
  reader;
  provider;
  signer;
  writer;

  async connect() {
    this.rpcProvider = await new ethers.JsonRpcProvider("http://localhost:8545");
    this.reader = await new ethers.Contract(this.contractAddress, abi, this.rpcProvider);
  }

  async connectWallet() {
    this.provider = await new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.writer = await new ethers.Contract(this.contractAddress, abi, this.signer);
    return await this.signer.getAddress();
  }

  async getAllProposalIds() {
    !this.reader && (await this.connect());

    try {
      return await this.reader.getAllProposalIds();
    } catch (error) {
      console.error(error);
    }
  }

  async state(proposalId) {
    !this.reader && (await this.connect());

    try {
      return await this.reader.state(proposalId);
    } catch (error) {
      console.error(error);
    }
  }

  // const [state, setState] = useState(new Map());
  async viewProposal(proposalId) {
    !this.reader && (await this.connect());

    try {
      // const resProposal =
      // setInterval(() => {
      //   // await this.reader.getState(proposalId).then((state) => {
      //     setState(state);
      //   })
      // }, 1000);
      return await this.reader.viewProposal(proposalId);
    } catch (error) {
      console.error(error);
    }
  }

  async viewMyBalances() {
    !this.writer && (await this.connectWallet());

    try {
      return await this.writer.viewMyBalances();
    } catch (error) {
      console.error(error);
    }
  }

  async create_A_of_B_propose(target, value, period) {
    // if (!this.writer) await this.connectWallet();
    // this.writer || (await this.connectWallet());
    !this.writer && (await this.connectWallet());

    try {
      return await this.writer.create_A_of_B_propose(target, value, period);
    } catch (error) {
      console.error(error);
    }
  }

  async myCastVote(proposalId, support, amount) {
    !this.writer && (await this.connectWallet());

    try {
      return await this.writer.myCastVote(proposalId, support, amount);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new GovernorServices();
