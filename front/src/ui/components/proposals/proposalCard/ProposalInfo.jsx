import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../core/context/Context.jsx";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getQuorumType, proposalState, proposalType } from "../../../../core/data/structures.js";
import { ProposalManager } from "./ProposalManager.jsx";

const ProposalInfo = ({ proposalId }) => {
  const [proposal, setProposal] = useState({});
  const [state, setState] = useState({});
  const [proposer, setProposer] = useState("");

  const { wallet, viewProposal, viewState } = useContext(Context);

  useEffect(() => {
    (async () => {
      const [proposalData, stateData] = await Promise.all([viewProposal(proposalId), viewState(proposalId)]);
      setProposal(proposalData);
      setState(stateData);
      setProposer(proposal.proposer?.toString());
    })();
  }, [proposalId, state]);

  const getProposer = () => {
    return { proposer };
  };

  return (
    <>
      <ListGroup>
        <ListGroupItem>
          <h5>Предложение: {proposal.description?.toString() || ""}</h5>
        </ListGroupItem>
        <ListGroupItem>Состояние голосования: {proposalState(state)}</ListGroupItem>
        <ListGroupItem>Инициатор голосования: {proposer || ""}</ListGroupItem>
        {proposal.description?.toString() === "investing" && (
          <>
            <ListGroupItem>Куда вложить: {proposal.target?.toString() || ""}</ListGroupItem>
            <ListGroupItem>Сколько вложить: {proposal.value?.toString() || ""} ETHER</ListGroupItem>
          </>
        )}
        {proposal.description?.toString() === "setDao" && <ListGroupItem>Изменить права: {proposal.changeHim?.toString() || ""}</ListGroupItem>}
        <ListGroupItem>Тип предложения: {proposalType(proposal.typ?.toString()) || ""}</ListGroupItem>
        <ListGroupItem>Тип достижения кворума: {getQuorumType(proposal.typ?.toString(), proposal.simpleMost?.toString())}</ListGroupItem>
        <ListGroupItem>Время голосования: {proposal.period?.toString() / 12 || ""} минут</ListGroupItem>
        <ListGroupItem className="voters">
          Проголосовавшие: <p>{proposal.voters?.toString().replaceAll(",", "\n")}</p>
        </ListGroupItem>
        <ListGroupItem>За: {proposal.votesFor?.toString() || ""}</ListGroupItem>
        <ListGroupItem>Против: {proposal.votesAgainst?.toString() || ""}</ListGroupItem>
      </ListGroup>
      {wallet === proposer && proposalState(state) !== "Завершено" && <ProposalManager proposalId={proposalId} />}
    </>
  );
};

export { ProposalInfo };
