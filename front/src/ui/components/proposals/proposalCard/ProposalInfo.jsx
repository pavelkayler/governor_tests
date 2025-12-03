import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../core/context/Context.jsx";
import "../../../utils/enums.js";
import { proposalType, quorumType, token, viewState } from "../../../utils/enums.js";

const ProposalInfo = ({ proposalId }) => {
  const { viewProposal, getState } = useContext(Context);
  const [proposal, setProposal] = useState([]);
  const [state, setState] = useState();

  useEffect(() => {
    (async () => {
      await viewProposal(proposalId).then((data) => setProposal(data));
      await getState(proposalId).then((data) => setState(data));
    })();
  }, [viewProposal, getState, state, proposal]);

  return (
    <div className="m-2 p-2">
      <p>Proposal Id: {proposalId}</p>
      <p>Статус голосования: {viewState(state)}</p>
      <p>Инициатор голосования: {proposal.proposer}</p>
      <p>Тип голосования: {proposalType(proposal.typ)}</p>
      <p>Механизм достижения кворума: {quorumType(Number(proposal.typ), proposal.simpleMost?.toString())}</p>

      <p>Куда инвестировать: {proposal.target}</p>
      <p>Сколько инвестировать: {proposal.value} ETHER</p>

      <p>Изменить права доступа у пользователя: {proposal.changeHim?.toString()}</p>

      <p>Меняется токен: {token(proposal.changeSystem?.toString())}</p>
      <p>Новый делитель: {proposal.newDenominator?.toString()}</p>

      <p>Время голосования: {Number(proposal.period) / 12} минут</p>
      <p>Проголосовавшие: {proposal.voters?.toString()}</p>
      <p>Голоса За: {proposal.votesFor}</p>
      <p>Голоса Против: {proposal.votesAgainst}</p>
    </div>
  );
};

export { ProposalInfo };
