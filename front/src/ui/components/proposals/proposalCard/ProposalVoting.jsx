import { useContext } from "react";
import { Context } from "../../../../core/context/Context.jsx";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

const ProposalVoting = ({ proposalId }) => {
  const { myCastVote } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const support = e.target[0].checked ? 1 : 0;

    await myCastVote(proposalId, support, Number(e.target[1].value));
    console.log(proposalId, support, Number(e.target[1].value));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormLabel column={"sm"}>Проголосовать</FormLabel>
        <FormGroup>
          <FormCheck type={"checkbox"} label={"Голосовать ЗА"} />
        </FormGroup>
        <FormGroup>
          <FormControl required type="number" placeholder="сколько голосов" />
        </FormGroup>
        <Button type={"submit"} variant={"success"}>
          Проголосовать
        </Button>
      </Form>
    </>
  );
};

export { ProposalVoting };
