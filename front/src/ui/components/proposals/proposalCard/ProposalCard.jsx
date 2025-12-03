import { Card, CardBody } from "react-bootstrap";
import { ProposalInfo } from "./ProposalInfo.jsx";
import { ProposalVoting } from "./ProposalVoting.jsx";
import { ProposalManager } from "./ProposalManager.jsx";

const ProposalCard = ({ proposalId }) => {
  return (
    <div className="d-flex flex-column m-2 p-2">
      <Card className="d-flex flex-column flex-wrap m-2 p-2">
        <CardBody>
          <ProposalInfo proposalId={proposalId} />
          <ProposalVoting proposalId={proposalId} />
          <ProposalManager proposalId={proposalId} />
        </CardBody>
      </Card>
    </div>
  );
};

export { ProposalCard };
