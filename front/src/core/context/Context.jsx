import { createContext, useState } from "react";
import GovernorServices from "../../services/governorServices/GovernorServices.js";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [balances, setBalances] = useState([]);

  const connectWallet = async () => {
    await GovernorServices.connectWallet().then((data) => setWallet(data));
  };

  const getAllProposalIds = async () => {
    await GovernorServices.getAllProposalIds().then((data) => {
      setProposals(data);
    });
  };

  const viewProposal = async (proposalId) => {
    return await GovernorServices.viewProposal(proposalId);
  };

  const viewState = async (proposalId) => {
    return await GovernorServices.state(proposalId);
  };

  const getBalances = async () => {
    await GovernorServices.viewMyBalances().then((data) => {
      setBalances(data);
    });
  };

  const create_A_of_B_propose = async (target, value, period) => {
    await GovernorServices.create_A_of_B_propose(target, value, period);
  };

  const myCastVote = async (proposalId, support, amount) => {
    await GovernorServices.myCastVote(proposalId, support === true ? 1 : 0, amount);
  };

  const values = {
    connectWallet,
    wallet,
    proposals,
    getAllProposalIds,
    balances,
    getBalances,
    viewProposal,
    viewState,
    create_A_of_B_propose,
    myCastVote,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
