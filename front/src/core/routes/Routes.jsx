import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../ui/pages/mainPage/MainPage.jsx";
import CabinetPage from "../../ui/pages/cabinetPage/CabinetPage.jsx";
import ProposalsPage from "../../ui/pages/proposalsPage/ProposalsPage.jsx";
import SuccessfullProposesPage from "../../ui/pages/successfullProposalsPage/SuccessfullProposesPage.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/cabinet",
    element: <CabinetPage />,
  },
  {
    path: "/proposals",
    element: <ProposalsPage />,
  },
  {
    path: "/success",
    element: <SuccessfullProposesPage />,
  },
]);

export { Routes };
