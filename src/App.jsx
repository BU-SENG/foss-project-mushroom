import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ComponentShowcase from "./pages/ComponentShowcase.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<ComponentShowcase />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
