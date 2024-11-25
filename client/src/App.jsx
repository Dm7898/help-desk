import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import CustomerDashboard from "./dashborads/CustomerDashboard";
import AdminDashboard from "./dashborads/AdminDashboard";
import AgentDashboard from "./dashborads/AgentDashboard";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import Layout from "./layout/Layout";

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
