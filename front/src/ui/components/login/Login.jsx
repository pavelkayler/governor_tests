import { Button, Card, Form, FormCheck, FormControl, FormGroup } from "react-bootstrap";
import GovernorServices from "../../../services/governorServices/GovernorServices.js";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Login = () => {
  const { connectWallet, wallet } = useContext(Context);

  const handleLogin = async () => {
    await connectWallet();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-2 p-2">
      {wallet === null ? (
        <Button onClick={handleLogin} className="d-flex">
          Авторизироваться через Metamask
        </Button>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <p>^^^^^^^^^^^^^^^^^</p>
          <p>адрес вашего кошелька</p>
          <b>Вы авторизированы!</b>
        </div>
      )}
      <Form onSubmit={handleClick}>
        <FormGroup>
          <FormControl type="text" placeholder="jopa" />
        </FormGroup>
        <FormGroup>
          <FormCheck type="switch" label={"adasdasd"} />
        </FormGroup>
        <Button type="submit">click</Button>
      </Form>
    </div>
  );
};

export { Login };
