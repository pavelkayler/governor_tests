import { Button, Card, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { useContext, useState } from "react";
import { Context } from "../../../../core/context/Context.jsx";
import { fc, fg } from "../../../utils/Utils.jsx";

const CreatePropose = () => {
  const [selected, setSelected] = useState("");
  const { create_A_of_B_propose, create_C_or_D_propose, create_E_or_F_propose } = useContext(Context);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    switch (selected) {
      case "Инвестирование":
        await create_A_of_B_propose(e.target[1].value, e.target[2].value, e.target[3].value * 12);
        break;
      case "Добавить/удалить участника DAO":
        await create_C_or_D_propose(e.target[1].value, e.target[2].checked, e.target[3].checked, e.target[4].value * 12);
        break;
      case "Управление токенами":
        console.log(e.target[1].checked, e.target[2].checked, e.target[3].value * 1, e.target[4].value * 12);
        await create_E_or_F_propose(e.target[1].checked, e.target[2].checked, e.target[3].value * 1, e.target[4].value * 12);
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Card className="d-flex justify-content-center align-items-center p-3 m-3 w-50">
        <Form onSubmit={handleCreate} className="d-flex flex-column justify-items-evenly w-100">
          <FormLabel column="sm">Создать предложение</FormLabel>
          <FormSelect value={selected} onChange={handleSelect}>
            {/*0*/}
            <option value="" disabled="disabled">
              Выберите тип предложения...
            </option>
            <option id="0">Инвестирование</option>
            <option id="1">Добавить/удалить участника DAO</option>
            <option id="2">Управление токенами</option>
          </FormSelect>
          <FormLabel column="lg">{selected}</FormLabel>
          {selected === "Инвестирование" && (
            <>
              {fg("Адрес стартапа", "text", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "address")}
              {fg("Сколько инвестировать (в ether)", "number", "10000", "ETH")}
            </>
          )}
          {selected === "Добавить/удалить участника DAO" && (
            <>
              {fg("Адрес пользователя", "text", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "")}
              {fc("Простое большинство?", true)}
              {fc("Добавить пользователя?", true)}
            </>
          )}
          {selected === "Управление токенами" && (
            <>
              {fc("Простое большинство?", true)}
              {fc("Системный токен?", false)}
              {fg("Новый делитель", "number", "12", "6 now")}
            </>
          )}
          {selected && (
            <>
              {fg("Время для голосования (в минутах)", "number", "5", "minutes")}
              <Button type="submit">Создать предложение</Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export { CreatePropose };
