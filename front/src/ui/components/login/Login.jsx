import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { Button, Card, CardBody, CardText } from "react-bootstrap";

const Login = () => {
  const { connect, wallet } = useContext(Context);

  return <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{ backgroundColor: "mediumpurple" }}></div>;
};

export { Login };
