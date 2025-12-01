import { useContext, useEffect, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const ProposalInfo = ({ proposalId }) => {
  const [proposal, setProposal] = useState({});
  const [state, setState] = useState({});

  const { viewProposal, viewState, successfullProposes, setSuccessfullProposes } = useContext(Context);

  useEffect(() => {
    (async () => {
      await viewProposal(proposalId).then((data) => {
        setProposal(data);
      });
      await viewState(proposalId).then((data) => {
        setState(data);
      });
      // await setVoters(proposal.voters);
      setSuccessfullProposes(...successfullProposes, successfullProposes);
    })();
  }, [proposal]);

  const proposalTypes = {
    0: "A: инвестирование в новый стартап",
    1: "B: инвестирование в существующий стартап",
    2: "C: добавление участника DAO",
    3: "D: исключение участника DAO",
    4: "E: управление системным токеном",
    5: "F: управление warp-токеном",
  };

  const quorumTypes = {
    true: "Простое большинство",
    false: "Супер большинство",
  };

  const proposalStates = {
    0: "Ожидает",
    1: "Активное",
    2: "Отменено",
    3: "Отвергнуто",
    4: "Успешно",
    5: "В очереди",
    6: "Вышло время",
    7: "Завершено",
  };

  const proposalType = (type) => proposalTypes[type] || type;
  const quorumType = (bool) => quorumTypes[bool] || bool;
  const proposalState = (state) => proposalStates[state];

  const getQuorumType = (typ, bool) => {
    switch (typ) {
      case "0":
        return "Голоса по весу";
      case "1":
        return "Голоса по весу";
      case "2":
        return quorumType(bool);
      case "3":
        return quorumType(bool);
      case "4":
        return quorumType(bool);
      case "5":
        return quorumType(bool);
    }
  };

  return (
    <ListGroup>
      <ListGroupItem>
        <h5>Предложение: {proposal.description?.toString() || ""}</h5>
      </ListGroupItem>
      <ListGroupItem>Состояние голосования: {proposalState(state)}</ListGroupItem>
      <ListGroupItem>Инициатор голосования: {proposal.proposer?.toString() || ""}</ListGroupItem>
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
        Проголосовавшие: <p>{proposal.voters?.toString().replace(",", "\n")}</p>
      </ListGroupItem>
      <ListGroupItem>За: {proposal.votesFor?.toString() || ""}</ListGroupItem>
      <ListGroupItem>Против: {proposal.votesAgainst?.toString() || ""}</ListGroupItem>
    </ListGroup>
  );
};

export { ProposalInfo };
