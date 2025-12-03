const roles = {
  0: "не пользователь",
  1: "пользователь",
  2: "участник DAO",
};

const states = {
  0: "Ожидает",
  1: "Активно",
  2: "Отменено",
  3: "Отвергнуто",
  4: "Голосование завершено",
  5: "В очереди",
  6: "Время вышло",
  7: "Выполнено",
};

const proposalTypes = {
  0: "Инвестирование в новый стартап",
  1: "Инвестирование в существующий стартап",
  2: "Добавление пользователя в DAO",
  3: "Исключение пользователя из DAO",
  4: "Управление системным токеном",
  5: "Управление wrap-токеном",
};

const quorumTypes = {
  true: "Простое большинство",
  false: "Супер большинство",
};

const tokens = {
  true: "системный",
  false: "wrap",
};

export const role = (num) => roles[num];

export const proposalType = (num) => proposalTypes[num] || num;

export const quorumType = (num, bool) => {
  if (num > 1) {
    return quorumTypes[bool];
  } else {
    return "Голоса по весу";
  }
};

export const viewState = (num) => states[num];

export const token = (bool) => tokens[bool];
