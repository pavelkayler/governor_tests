import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { role } from "../../utils/enums.js";
import { useNavigate } from "react-router-dom";

const Balances = () => {
  const { connect, wallet, setWallet, userBalances, viewMyBalances, userInfo } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      if (!wallet) {
        nav("/");
        return;
      }
      await viewMyBalances();
    })();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Ваш кошелек: {wallet}</p>
      <p>Уровень доступа: {role(userInfo[0])}</p>
      <p className=""> ETHER: {Number(userBalances[0]) / 10 ** 18} </p>
      <p className=""> PROFI: {Number(userBalances[1]) / 10 ** 12} </p>
      <p className=""> WRAP: {Number(userBalances[2]) / 10 ** 12} </p>
    </div>
  );
};

export { Balances };
