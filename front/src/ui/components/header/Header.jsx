import { Link, useNavigate } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Balance } from "../balance/Balance.jsx";

const Header = () => {
  const { wallet, disconnectWallet } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    if (!wallet) {
      nav("/");
    }
  }, []);

  const handleExit = () => {
    disconnectWallet();
    nav("/");
  };

  return (
    <>
      <div
        className="d-flex flex-column w-100 align-items-center justify-content-evenly"
        style={{
          height: "15vh",
          backgroundColor: "rebeccapurple",
        }}
      >
        <div className="d-flex flex-row justify-content-center w-100">
          <Navbar>
            <Nav>
              <h1>
                <Link to="/">Профессионалы 2026</Link>
              </h1>
            </Nav>
            {wallet && (
              <>
                <Nav>
                  <Link to="/proposals">Все предложения</Link>
                </Nav>
                <Nav>
                  <Link to="/log">Журнал принятых решений</Link>
                </Nav>
              </>
            )}
          </Navbar>
        </div>
        {wallet && (
          <div className="d-flex flex-column justify-content-center align-content-center text-center w-100">
            <Button variant="outline-dark" onClick={handleExit} className="d-flex justify-content-center align-self-center w-50">
              Выйти
            </Button>
            <Balance />
          </div>
        )}
      </div>
    </>
  );
};

export { Header };
