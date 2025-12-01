import { Button, Card, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { useContext, useState } from "react";
import { Context } from "../../../core/context/Context.jsx";

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
              <FormGroup>
                {/*1*/}
                <FormLabel column={"sm"}>Адрес стартапа</FormLabel>
                <FormControl required type="text" defaultValue="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" />
              </FormGroup>
              <FormGroup>
                {/*2*/}
                <FormLabel column={"sm"}>Сколько инвестировать (в ether)</FormLabel>
                <FormControl required type="number" defaultValue="10000" placeholder="ETH" />
              </FormGroup>
            </>
          )}
          {selected === "Добавить/удалить участника DAO" && (
            <>
              <FormGroup>
                {/*3*/}
                <FormLabel column={"sm"}>Адрес пользователя</FormLabel>
                <FormControl required type="text" defaultValue="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" />
              </FormGroup>
              <FormGroup>
                {/*4*/}
                <FormCheck type="checkbox" label="Простое большинство?" defaultChecked={true} />
              </FormGroup>
              <FormGroup>
                {/*5*/}
                <FormCheck type={"checkbox"} label="Добавить пользователя?" defaultChecked={true} />
              </FormGroup>
            </>
          )}
          {selected === "Управление токенами" && (
            <>
              <FormGroup>
                {/*6*/}
                <FormCheck type="checkbox" label="Простое большинство?" defaultChecked={true} />
              </FormGroup>
              <FormGroup>
                {/*7*/}
                <FormCheck type="checkbox" label="Системный токен?" defaultChecked={false} />
              </FormGroup>
              <FormGroup>
                {/*8*/}
                <FormLabel column={"sm"}>Новый делитель</FormLabel>
                <FormControl required type="number" defaultValue="12" />
              </FormGroup>
            </>
          )}
          {selected && (
            <>
              <FormGroup>
                {/*9*/}
                <FormLabel column={"sm"}>Время для голосования (в минутах)</FormLabel>
                <FormControl required type="number" defaultValue="5" placeholder="minutes" />
              </FormGroup>
              <Button type="submit">Создать предложение</Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export { CreatePropose };
