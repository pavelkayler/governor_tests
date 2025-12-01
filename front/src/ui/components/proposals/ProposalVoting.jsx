import { Button, Form, FormCheck, FormControl, FormGroup } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const ProposalVoting = ({ proposalId }) => {
  const { myCastVote } = useContext(Context);

  const handleVote = async (e) => {
    e.preventDefault();
    await myCastVote(proposalId, e.target[1].checked, e.target[0].value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-2 p-2">
      <div className="d-flex flex-column align-items-center">
        <Form className="d-flex flex-column align-items-center" onSubmit={handleVote}>
          <FormGroup>
            <FormControl type="number" placeholder="токенов" defaultValue="100" />
          </FormGroup>
          <FormGroup>
            <FormCheck type="checkbox" label="Голосовать ЗА?" />
          </FormGroup>
          <Button type="submit" className="m-2">
            Проголосовать
          </Button>
        </Form>
      </div>
    </div>
  );
};

export { ProposalVoting };
