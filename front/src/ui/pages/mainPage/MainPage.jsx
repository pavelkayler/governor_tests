import { Header } from "../../components/header/Header.jsx";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Login } from "../../components/login/Login.jsx";

const MainPage = () => {
  const { connect } = useContext(Context);

  useEffect(() => {
    (async () => {
      await connect;
    })();
  }, []);
  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export default MainPage;
