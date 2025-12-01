import { CreatePropose } from "./CreatePropose.jsx";
import { ProposalCard } from "./ProposalCard.jsx";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Proposals = () => {
  const { getAllProposalIds, proposals } = useContext(Context);

  useEffect(() => {
    (async () => {
      await getAllProposalIds();
    })();
  });

  return <div className="d-flex flex-row flex-wrap justify-content-center">{proposals.length > 0 && proposals.map((proposalId, index) => <ProposalCard key={index} proposalId={proposalId} />)}</div>;
};

export { Proposals };
