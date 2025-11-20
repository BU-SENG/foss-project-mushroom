import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ComponentShowcase from "./pages/ComponentShowcase.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound.jsx";
// import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Header from "./components/Header";

function App() {
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/component-showcase" element={<ComponentShowcase />} />
          <Route
            path="/register"
            element={
              // <PublicRoute>
                <Register />
              // </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              // <PublicRoute>
                <Login />
              // </PublicRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <DashboardLayout>
                <NotFound />
              </DashboardLayout>
            }
          />
          <Route
            path="/student/*"
            element={
              <DashboardLayout>
                <NotFound />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  {role === "admin" ? (
                    <ComponentShowcase />
                  ) : (
                    <StudentDashboard />
                  )}
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
