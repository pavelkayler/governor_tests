import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../ui/pages/mainPage/MainPage.jsx";
import ProposalsPage from "../../ui/pages/proposalsPage/ProposalsPage.jsx";
import ProposalsLog from "../../ui/pages/proposalsLog/ProposalsLog.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/proposals",
    element: <ProposalsPage />,
  },
  {
    path: "/log",
    element: <ProposalsLog />,
  },
]);

export default routes;
