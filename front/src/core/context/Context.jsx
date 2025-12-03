import { createContext, useState } from "react";
import GovernorService from "../../services/governorService/GovernorService.js";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userBalances, setUserBalances] = useState([]);

  const [proposalsIds, setProposalsIds] = useState([]);

  const [successfullProposals, setSuccessfullProposals] = useState([]);

  const connect = async () => {
    await GovernorService.connect().then((data) => setWallet(data));
  };

  const disconnect = async () => {
    await GovernorService.disconnect();
  };

  const loadSuccessfullProposals = async () => {
    const sps = [];
    for (let i = 0; i < proposalsIds.length; i++) {
      const id = proposalsIds[i];

      if (Number(await getState(id)) === 7) {
        await viewProposal(id).then((data) => sps.push(data));
      }
      setSuccessfullProposals(sps);
      console.log(sps);
    }
  };

  const viewUserInfo = async () => {
    await GovernorService.viewUserInfo().then((userInfo) => setUserInfo(userInfo));
  };

  const viewMyBalances = async () => {
    await GovernorService.viewMyBalances().then((userBalances) => setUserBalances(userBalances));
  };

  const getAllProposalIds = async () => {
    await GovernorService.getAllProposalIds().then((data) => setProposalsIds(data));
  };

  const viewProposal = async (id) => {
    return await GovernorService.viewProposal(id);
  };

  const getState = async (id) => {
    return await GovernorService.getState(id);
  };

  const create_A_of_B_propose = async (target, value, period) => {
    await GovernorService.create_A_of_B_propose(target, value, period);
  };

  const create_C_or_D_propose = async (user, simpleMost, adding, _period) => {
    await GovernorService.create_C_or_D_propose(user, simpleMost, adding, _period);
  };

  const create_E_or_F_propose = async (simpleMost, _system, _newDenominator, _period) => {
    await GovernorService.create_E_or_F_propose(simpleMost, _system, _newDenominator, _period);
  };

  const myCastVote = async (proposalId, support, amount) => {
    await GovernorService.myCastVote(proposalId, support, amount);
  };

  const myExecute = async (proposalId) => {
    await GovernorService.myExecute(proposalId);
  };

  const cancel = async (proposalId) => {
    await GovernorService.cancel(proposalId);
  };

  const buyWrapToken = async (value) => {
    await GovernorService.buyWrapToken(value);
  };

  const delegateWrapToken = async (proposalId, delegateTo) => {
    await GovernorService.delegateWrapToken(proposalId, delegateTo);
  };

  const values = {
    connect,
    disconnect,
    wallet,
    setWallet,
    viewUserInfo,
    userInfo,
    viewMyBalances,
    userBalances,
    getAllProposalIds,
    proposalsIds,
    viewProposal,
    getState,
    create_A_of_B_propose,
    create_C_or_D_propose,
    create_E_or_F_propose,
    myCastVote,
    myExecute,
    cancel,
    successfullProposals,
    loadSuccessfullProposals,
    buyWrapToken,
    delegateWrapToken,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export { Context, ContextProvider };
