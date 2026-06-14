import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import StudentDashboard from "./pages/StudentDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Accommodation from "./pages/Accommodation";
import Marketplace from "./pages/Marketplace";
import Jobs from "./pages/Jobs";
import Events from "./pages/Events";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Messages from "./pages/Messages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-secondary text-white selection:bg-primary/30">
          <Navbar />
          <div className="pt-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Demo Routes - No Protection for Video */}
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/businesses" element={<Services />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/business-dashboard" element={<BusinessDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
