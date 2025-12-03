import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { ProposalCard } from "./proposalCard/ProposalCard.jsx";
import { ProposalInfo } from "./proposalCard/ProposalInfo.jsx";

const Successfull = () => {
  const { getAllProposalIds, loadSuccessfullProposals, successfullProposals } = useContext(Context);

  useEffect(() => {
    (async () => {
      await getAllProposalIds();
      await loadSuccessfullProposals();
    })();
  }, []);

  return (
    <div className={"d-flex flex-column"}>
      {successfullProposals.length > 0 && successfullProposals.map((proposal, index) => <ProposalInfo key={index} proposalId={proposal[0]} />)}
    </div>
  );
};

export { Successfull };
