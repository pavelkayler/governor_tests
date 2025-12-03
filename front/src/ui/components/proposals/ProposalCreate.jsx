import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

const ProposalCreate = () => {
  const { create_A_of_B_propose, create_C_or_D_propose, create_E_or_F_propose } = useContext(Context);

  const handleAB = async (e) => {
    e.preventDefault();
    await create_A_of_B_propose(e.target[0].value, e.target[1].value, Number(e.target[2].value) * 12);
  };

  const handleCD = async (e) => {
    e.preventDefault();
    await create_C_or_D_propose(e.target[0].value, e.target[1].checked, e.target[2].checked, Number(e.target[3].value) * 12);
  };

  const handleEF = async (e) => {
    e.preventDefault();
    await create_E_or_F_propose(e.target[0].checked, e.target[1].checked, Number(e.target[2].value), Number(e.target[3].value) * 12);
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleAB}>
          <FormLabel column={"sm"}>Создать предложение об инвестиции</FormLabel>
          <FormGroup>
            <FormControl required type="text" placeholder={"startup"} defaultValue="0xdB7d6AB1f17c6b31909aE466702703dAEf9269Cf" />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" placeholder={"ether"} defaultValue="100" />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" placeholder={"время в минутах"} defaultValue="5" />
          </FormGroup>
          <Button type={"submit"}>Создать</Button>
        </Form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleCD}>
          <FormLabel column={"sm"}>Создать предложение об добавлении/исключении в/из DAO</FormLabel>
          <FormGroup>
            <FormControl required type="text" placeholder={"пользователь"} defaultValue="0xf92495BB812734E971a590E15a859edE917a3f33" />
          </FormGroup>
          <FormGroup>
            <FormCheck type={"checkbox"} label={"Простое большинство"} />
          </FormGroup>
          <FormGroup>
            <FormCheck type={"checkbox"} label={"Добавить?"} />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" placeholder={"время в минутах"} defaultValue="5" />
          </FormGroup>
          <Button type={"submit"}>Создать</Button>
        </Form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleEF}>
          <FormLabel column={"sm"}>Создать предложение об изменении делителя системного/wrap токена</FormLabel>
          <FormGroup>
            <FormCheck type={"checkbox"} label={"Простое большинство"} />
          </FormGroup>
          <FormGroup>
            <FormCheck type={"checkbox"} label={"Системный токен?"} />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" placeholder={"новый делитель"} />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" placeholder={"время в минутах"} defaultValue="5" />
          </FormGroup>
          <Button type={"submit"}>Создать</Button>
        </Form>
      </div>
    </>
  );
};

export { ProposalCreate };
