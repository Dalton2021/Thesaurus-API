import { createContext, useState } from "react";
import { Thesaurus_api } from "./ApiExample";

const TermContext = createContext();

export const TermProvider = ({ children }) => {
  const [terms, setTerms] = useState(Thesaurus_api);

  let list = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  list.unshift("123");

  const setActiveTab = () => {};

  return <TermContext.Provider value={{ terms, list }}>{children}</TermContext.Provider>;
};

export default TermContext;

