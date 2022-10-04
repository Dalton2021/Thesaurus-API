import "./App.css";
import { TermProvider } from "./TermContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Thesaurus from "./pages/Thesaurus";
import Results from "./pages/Results";

function App() {
  return (
    <div className="App">
      <TermProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<Thesaurus />} />
            <Route path="/results/:id/" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </TermProvider>
    </div>
  );
}

export default App;
