import { ProposalInfo } from "./ProposalInfo.jsx";
import { ProposalVoting } from "./ProposalVoting.jsx";
import { ProposalManager } from "./ProposalManager.jsx";
import { Card, CardBody } from "react-bootstrap";

const ProposalCard = ({ proposalId }) => {
  return (
    <Card className="d-flex flex-row flex-wrap align-items-center justify-content-center p-2 m-2">
      <CardBody>
        <ProposalInfo proposalId={proposalId} />
        <ProposalVoting proposalId={proposalId} />
      </CardBody>
    </Card>
  );
};

export { ProposalCard };
