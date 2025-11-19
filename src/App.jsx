import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentShowcase from "./pages/ComponentShowcase.jsx";
import Home from "./pages/Home.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { role } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/component-showcase" element={<ComponentShowcase />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
