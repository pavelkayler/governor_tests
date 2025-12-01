import { useContext } from "react";
import { Context } from "../../../core/context/Context.jsx";

const Log = () => {
  const { successfullProposes } = useContext(Context);

  console.log(successfullProposes);
  return 123;
};

export { Log };
