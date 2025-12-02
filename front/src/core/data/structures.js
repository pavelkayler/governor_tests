import { Button } from "react-bootstrap";

export const roles = {
  0: "NON",
  1: "USER",
  2: "DAO",
};

export const proposalTypes = {
  0: "A: инвестирование в новый стартап",
  1: "B: инвестирование в существующий стартап",
  2: "C: добавление участника DAO",
  3: "D: исключение участника DAO",
  4: "E: управление системным токеном",
  5: "F: управление wrap-токеном",
};

export const quorumTypes = {
  true: "Простое большинство",
  false: "Супер большинство",
};

export const proposalStates = {
  0: "Ожидает",
  1: "Активное",
  2: "Отменено",
  3: "Отвергнуто",
  4: "Успешно",
  5: "В очереди",
  6: "Вышло время",
  7: "Завершено",
};

export const proposalType = (type) => proposalTypes[type] || type;
export const proposalState = (state) => proposalStates[state];
const quorumType = (bool) => quorumTypes[bool] || bool;

export const getQuorumType = (typ, bool) => {
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

export const getRole = (role) => {
  return roles[role];
};
