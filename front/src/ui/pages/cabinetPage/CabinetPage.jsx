import { Header } from "../../components/header/Header.jsx";
import { Balances } from "../../components/balances/Balances.jsx";
import { ProposalCreate } from "../../components/proposals/ProposalCreate.jsx";
import { BuyAndDelegate } from "../../components/userButtons/BuyAndDelegate.jsx";
import { Context } from "../../../core/context/Context.jsx";
import { useContext } from "react";

const CabinetPage = () => {
  const { userInfo } = useContext(Context);
  return (
    <>
      <Header />
      <Balances />
      {Number(userInfo[0]) === 2 && <ProposalCreate />}
      {Number(userInfo[0]) === 1 && <BuyAndDelegate />}
    </>
  );
};

export default CabinetPage;
