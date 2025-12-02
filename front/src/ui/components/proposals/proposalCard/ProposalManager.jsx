import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../../core/context/Context.jsx";

const ProposalManager = ({ proposalId }) => {
  const { cancel, myExecute } = useContext(Context);

  const handleCancel = async (e) => {
    e.preventDefault();
    await cancel(proposalId);
  };

  const handleExecute = async (e) => {
    e.preventDefault();
    await myExecute(proposalId);
  };

  return (
    <div className="d-flex  flex-row flex-wrap justify-content-center">
      <Button onClick={handleExecute} className="btn-secondary m-2">
        Execute
      </Button>
      <Button onClick={handleCancel} className="btn-secondary m-2">
        Отменить
      </Button>
    </div>
  );
};

export { ProposalManager };
