import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { ProposalCard } from "./proposalCard/ProposalCard.jsx";
import { useNavigate } from "react-router-dom";

const Proposals = () => {
  const { wallet, getAllProposalIds, proposalsIds } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      if (!wallet) {
        nav("/");
        return;
      }
      await getAllProposalIds();
    })();
  }, [getAllProposalIds, proposalsIds]);

  return <div>{proposalsIds.length > 0 && proposalsIds.toReversed().map((proposalId, index) => <ProposalCard key={index} proposalId={proposalId} />)}</div>;
};

export { Proposals };
