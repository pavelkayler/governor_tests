import { createContext } from "react";

const Context = createContext({});
const ContextProvider = ({ children }) => {
  const peepo = 2;

  const values = {
    peepo,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
