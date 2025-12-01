import { Button, Card, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const CreatePropose = () => {
  const { create_A_of_B_propose, proposalCreation } = useContext(Context);

  const handleCreate = async (e) => {
    e.preventDefault();
    await create_A_of_B_propose(e.target[0].value, e.target[1].value, e.target[2].value * 12);
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Card className="d-flex justify-content-center align-items-center p-3 m-3 w-50">
        <Form onSubmit={handleCreate} className="w-100">
          <FormLabel column="sm">Создать предложение</FormLabel>
          <FormGroup>
            <FormControl required type="text" defaultValue="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" defaultValue="10000" placeholder="ETH" />
          </FormGroup>
          <FormGroup>
            <FormControl required type="number" defaultValue="5" placeholder="minutes" />
          </FormGroup>
          <Button type="submit">Создать предложение</Button>
        </Form>
      </Card>
    </div>
  );
};

export { CreatePropose };
