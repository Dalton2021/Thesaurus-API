import { createContext, useState, useEffect } from "react";

const TermContext = createContext();

export const TermProvider = ({ children }) => {
  const [terms, setTerms] = useState([]);
  let [broad, setBroad] = useState([]);
  let [narrow, setNarrow] = useState([]);
  let [np, setNp] = useState([]);
  let [related, setRelated] = useState([]);

  const gatherApi = async () => {
    const [termsResp, broadResp, narrowResp, npResp, relatedResp] =
      await Promise.all([
        fetch("https://localhost:7004/api/Thesaurus_API_/Term"),
        fetch("https://localhost:7004/api/Thesaurus_API_/Broad"),
        fetch("https://localhost:7004/api/Thesaurus_API_/Narrow"),
        fetch("https://localhost:7004/api/Thesaurus_API_/Np"),
        fetch("https://localhost:7004/api/Thesaurus_API_/Related"),
      ]);
    const termsData = await termsResp.json();
    const broadData = await broadResp.json();
    const narrowData = await narrowResp.json();
    const npData = await npResp.json();
    const relatedData = await relatedResp.json();
    return [termsData, broadData, narrowData, npData, relatedData];
  };

  useEffect(() => {
    gatherApi().then(
      ([termsData, broadData, narrowData, npData, relatedData]) => {
        setTerms(termsData);
        setBroad(broadData);
        setNarrow(narrowData);
        setNp(npData);
        setRelated(relatedData);
      }
    );
  }, []);

  let list = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  list.unshift("123");

  //Eliminates matching id keys's from arrays which causes errors in React
  np = np.map((nps, i) => {
    return { ...nps, id: "np" + i };
  });

  broad = broad.map((broads, i) => {
    return { ...broads, id: "broad" + i };
  });

  related = related.map((relateds, i) => {
    return { ...relateds, id: "rel" + i };
  });

  narrow = narrow.map((narrows, i) => {
    return { ...narrows, id: "narr" + i };
  });

  return (
    <TermContext.Provider value={{ terms, list, broad, narrow, np, related }}>
      {children}
    </TermContext.Provider>
  );
};

export default TermContext;

// Logic to decide which term is currently being used
export const filterTerm = (item, id) => {
  item =
    id === "123"
      ? item.filter((term) =>
          term.preferred
            ? term.preferred.match(new RegExp(/^\d+/g)) !== null
            : term.nonPreferred.match(new RegExp(/^\d+/g)) !== null
        )
      : item.filter((letter) =>
          letter.preferred
            ? letter.preferred.startsWith(id)
            : letter.nonPreferred.startsWith(id)
        );
  return item;
};

export const sortItemsAlph = (item) => {
  return item.sort((a, b) =>
    (a.preferred || a.nonPreferred).localeCompare(
      b.preferred || b.nonPreferred,
      "en",
      { sensitivity: "base" }
    )
  );
};

export const indexLocation = (item, termID) => {
  return item.findIndex((i) =>
    termID.includes("np") ? i.id === termID : i.id === Number(termID)
  );
};

export const getPageID = (term) => {
  let NumberTest = term.preferred
    ? term.preferred.match(new RegExp(/^\d+/g)) !== null
    : term.nonPreferred.match(new RegExp(/^\d+/g)) !== null;

  if (NumberTest) {
    return "123";
  } else {
    return term.preferred
      ? term.preferred.substring(0, 1).toUpperCase()
      : term.nonPreferred.substring(0, 1).toUpperCase();
  }

  // let letterTest = term.preferred
  //   ? term.preferred.match(new RegExp(/^[a-zA-Z]+$/)) !== null
  //   : term.nonPreferred.match(new RegExp(/^[a-zA-Z]+$/)) !== null;

  // return NumberTest ? "Number" : "Letter";
};
