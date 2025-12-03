import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Balances } from "../balances/Balances.jsx";

const Header = () => {
  const { connect, wallet, setWallet, viewUserInfo, viewMyBalances, disconnect } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      await viewUserInfo();
      await viewMyBalances();
    })();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    await connect();
  };

  const handleLogout = () => {
    disconnect();
    setWallet(null);
    nav("/");
  };

  return (
    <div style={{ minHeight: "7rem", backgroundColor: "rebeccapurple" }} className="d-flex flex-column justify-content-center align-items-center text-white">
      <Navbar>
        <Nav>
          <Link to="/">
            <h4>Профессионалы 2026</h4>
          </Link>
        </Nav>
        {wallet && (
          <>
            <Nav>
              <Link to="/cabinet">Личный кабинет</Link>
            </Nav>

            <Nav>
              <Link to="/proposals">Все предложения</Link>
            </Nav>
          </>
        )}
        <Nav>
          <Link to="/success">Завершенные предложения</Link>
        </Nav>
      </Navbar>

      {wallet ? (
        <>
          <Button onClick={handleLogout} variant="outline-primary" className="mb-2">
            Выйти
          </Button>
          <p>{wallet}</p>
        </>
      ) : (
        <>
          <Button onClick={handleClick}>Авторизироваться через Metamask</Button>
        </>
      )}
    </div>
  );
};

export { Header };
