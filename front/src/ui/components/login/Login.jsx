import { Button, Card } from "react-bootstrap";
import GovernorServices from "../../../services/governorServices/GovernorServices.js";
import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Login = () => {
  const { connectWallet, wallet } = useContext(Context);
  const handleLogin = async () => {
    await connectWallet();
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-2 p-2">
      <Card className="d-flex justify-content-center align-items-center w-50">
        <Button onClick={handleLogin} className="d-flex">
          Авторизироваться через Metamask
        </Button>
        <p className="text-muted">wallet: {wallet || "-"}</p>
      </Card>
    </div>
  );
};

export { Login };
