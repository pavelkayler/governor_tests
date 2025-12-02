import { useContext, useEffect } from "react";
import { Context } from "../../../core/context/Context.jsx";
import { getRole } from "../../../core/data/structures.js";

const Balance = () => {
  const { wallet, viewUserInfo, userInfo, getBalances, balances } = useContext(Context);

  useEffect(() => {
    (async () => {
      await viewUserInfo();
      await getBalances();
    })();
  }, [userInfo, getBalances]);
  return (
    <p className="text-white">
      кошелек: <b>{wallet}</b>, роль: <b>{getRole(userInfo[0])}</b> ether: <b>{Number(balances[0]) / 10 ** (12)?.toString() || " 0"}</b>, profi:{" "}
      <b>{Number(balances[1]) / 10 ** (12)?.toString() || " 0"}</b>, wrap:
      <b>{Number(balances[2]) / 10 ** (12)?.toString() || " 0"}</b>
    </p>
  );
};

export { Balance };
