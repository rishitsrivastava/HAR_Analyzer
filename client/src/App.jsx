import { Routes, Route } from "react-router-dom"
import ManualPage from "./pages/ManualPage.jsx";
import SmartPage from "./pages/SmartPage.jsx";
import Home from "./pages/home.jsx";

function App() {

  return (
    <div className="bg-black text-gray-100">
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/manual" element={<ManualPage />} />
      <Route path="/smart" element={<SmartPage />} />
    </Routes>
</div>
)}

export default App;
