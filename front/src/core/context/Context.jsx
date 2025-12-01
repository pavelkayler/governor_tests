import { createContext, useState } from "react";
import GovernorServices from "../../services/governorServices/GovernorServices.js";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [balances, setBalances] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const [successfullProposes, setSuccessfullProposes] = useState([]);

  const connectWallet = async () => {
    await GovernorServices.connectWallet().then((data) => setWallet(data));
  };

  const disconnectWallet = async () => {
    await GovernorServices.disconnect();
    setWallet(null);
    setBalances([]);
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

  const viewUserInfo = async () => {
    await GovernorServices.viewUserInfo().then(async (data) => {
      setUserInfo(data);
    });
  };

  const getBalances = async () => {
    await GovernorServices.viewMyBalances().then((data) => {
      setBalances(data);
    });
  };

  const create_A_of_B_propose = async (target, value, period) => {
    await GovernorServices.create_A_of_B_propose(target, value, period);
  };

  const create_C_or_D_propose = async (_user, simpleMost, adding, _period) => {
    await GovernorServices.create_C_or_D_propose(_user, simpleMost, adding, _period);
  };

  const create_E_or_F_propose = async (simpleMost, _system, _newDenominator, _period) => {
    await GovernorServices.create_E_or_F_propose(simpleMost, _system, _newDenominator, _period);
  };

  const myCastVote = async (proposalId, support, amount) => {
    await GovernorServices.myCastVote(proposalId, support === true ? 1 : 0, amount);
  };

  const cancel = async (proposalId) => {
    await GovernorServices.cancel(proposalId);
  };

  const myExecute = async (proposalId) => {
    await GovernorServices.myExecute(proposalId);
  };

  const values = {
    connectWallet,
    disconnectWallet,
    wallet,
    setWallet,
    proposals,
    getAllProposalIds,
    successfullProposes,
    setSuccessfullProposes,
    balances,
    getBalances,
    userInfo,
    viewUserInfo,
    viewProposal,
    viewState,
    create_A_of_B_propose,
    create_C_or_D_propose,
    create_E_or_F_propose,
    myCastVote,
    cancel,
    myExecute,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
