import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentShowcase from './pages/ComponentShowcase.jsx';
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentShowcase />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
