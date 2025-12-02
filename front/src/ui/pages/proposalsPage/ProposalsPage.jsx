import { Header } from "../../components/header/Header.jsx";
import { Proposals } from "../../components/proposals/Proposals.jsx";
import { CreatePropose } from "../../components/proposals/proposalCard/CreatePropose.jsx";

const ProposalsPage = () => {
  return (
    <>
      <Header />
      <CreatePropose />
      <Proposals />
    </>
  );
};

export default ProposalsPage;
