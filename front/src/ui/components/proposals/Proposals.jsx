import { CreatePropose } from "./proposalCard/CreatePropose.jsx";
import { ProposalCard } from "./proposalCard/ProposalCard.jsx";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { useNavigate } from "react-router-dom";

const Proposals = () => {
  const { getAllProposalIds, proposals, wallet } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getAllProposalIds();
    })();
  }, [proposals]);

  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {proposals.length > 0 && proposals.map((proposalId, index) => <ProposalCard key={index} proposalId={proposalId} />)}
      </div>
    </>
  );
};

export { Proposals };
