import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Home from "./components/Home";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AgentDashboard from "./components/AgentDashboard";
import Tickets from "./components/Tickets";
import Customers from "./components/Customers";
import Layout from "./components/Layout";

const App = () => (
  <AuthProvider>
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/customers" element={<Customers />} />
          <Route element={<PrivateRoute allowedRoles={["Customer"]} />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Agent"]} />}>
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;
