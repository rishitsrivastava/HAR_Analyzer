import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom"
import ManualPage from "./pages/ManualPage.jsx";
import SmartPage from "./pages/SmartPage.jsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manual" element={<ManualPage />} />
      <Route path="/smart" element={<SmartPage />} />
    </Routes>
  );
}

export default App;
