import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ComponentShowcase from "./pages/ComponentShowcase.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComponentShowcase />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
