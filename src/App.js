import "./App.css";
import { TermProvider } from "./TermContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Thesaurus from "./pages/Thesaurus";
import Results from "./pages/Results";
import TermDetails from "./pages/TermDetails";

function App() {
  return (
    <div className="App">
      <TermProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Thesaurus />} />
            <Route path="/results/:id/" element={<Results />} />
            <Route path="/results/:id/:termID/" element={<TermDetails />} />
          </Routes>
        </BrowserRouter>
      </TermProvider>
    </div>
  );
}

export default App;
