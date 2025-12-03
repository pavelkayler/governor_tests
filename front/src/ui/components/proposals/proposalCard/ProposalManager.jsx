import { useContext } from "react";
import { Context } from "../../../../core/context/Context.jsx";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

const ProposalManager = ({ proposalId }) => {
  const { myExecute, cancel } = useContext(Context);

  const handleCancel = async (e) => {
    e.preventDefault();
    await cancel(proposalId);
  };

  const handleExecute = async (e) => {
    e.preventDefault();
    await myExecute(proposalId);
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleCancel}>
        Отменить голосование
      </Button>
      <Button variant="outline-success" onClick={handleExecute}>
        Применить предложение
      </Button>
    </>
  );
};

export { ProposalManager };
