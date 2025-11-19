import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentShowcase from "./pages/ComponentShowcase.jsx";
import Home from "./pages/Home.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/component-showcase" element={<ComponentShowcase />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
