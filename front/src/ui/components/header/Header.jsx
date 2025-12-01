import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <div
        className="d-flex flex-column w-100 justify-content-between"
        style={{
          height: "15vh",
          backgroundColor: "rebeccapurple",
        }}
      >
        <div className="d-flex flex-row justify-content-evenly w-100">
          <Navbar>
            <Nav>
              <Link to="/">Профессионалы 2026</Link>
            </Nav>
            <Nav>
              <Link to="/proposals">Все предложения</Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export { Header };
