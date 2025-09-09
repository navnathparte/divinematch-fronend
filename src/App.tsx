import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import Profile from "./components/Profile";
import PasswordUpdate from "./components/PasswordUpdate";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import VerifyCode from "./components/VerifyCode";
import ResetPassword from "./components/ResetPassword";

function App() {
  const { user, token } = useAuth();
  const userName = user?.username || "Guest";

  const ProtectedRoute = ({ children }: { children: any }) => {
    return token ? (
      <Layout userName={userName}>{children}</Layout>
    ) : (
      <Navigate to="/login" replace />
    );
  };

  const PublicRoute = ({ children }: { children: any }) => {
    return !token ? children : <Navigate to="/dashboard" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <PasswordUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />{" "}
            </PublicRoute>
          }
        />

        <Route
          path="/verifyCode"
          element={
            <PublicRoute>
              <VerifyCode />
            </PublicRoute>
          }
        />

        <Route
          path="/resetPassword"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Redirect to dashboard or login as default */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
