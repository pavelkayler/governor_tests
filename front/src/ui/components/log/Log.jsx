import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { ProposalCard } from "../proposals/proposalCard/ProposalCard.jsx";
import { ProposalInfo } from "../proposals/proposalCard/ProposalInfo.jsx";

const Log = () => {
  const { wallet, successfullProposes, loadSuccessfullProposals } = useContext(Context);

  useEffect(() => {
    (async () => {
      await loadSuccessfullProposals();
    })();
  }, [wallet, loadSuccessfullProposals]);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center">
      {successfullProposes.length === 0 && <p>нет принятых предложений</p>}
      {successfullProposes.map(({ id }) => (
        <div key={id.toString()} className="d-flex flex-row flex-wrap align-items-center justify-content-center p-2 m-2">
          <ProposalInfo proposalId={id} />
        </div>
      ))}
    </div>
  );
};

export { Log };
