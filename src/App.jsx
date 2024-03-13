import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Stripe from "./views/Stripe/Stripe";
import Success from "./views/Success/Success";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { UserProvider } from "./contexts/UserContext";
import Cancel from "./views/Memberships/Cancel/Cancel";
import ListEmployees from "./views/Employees/List/ListEmployees";
import CreateEmployees from "./views/Employees/Create/CreateEmployees";
import Screens from "./views/Screens/Screens";
import Rockobits from "./views/Rockobits/Rockobits";
import TransferRockobitsForm from "./views/Employees/Transfer/TransferRockobitsForm";
import LoginEmployee from "./views/LoginEmployee/LoginEmployee";
import Test from "./views/Test";
import RockobitsSuccess from "./views/Rockobits/RockobitsSuccess";
import RockobitsSale from "./views/Rockobits/RockobitsSale";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test />} />
              <Route path="/login-employee" element={<LoginEmployee />} />
            </Route>
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/screens" element={<Screens />}></Route>
                <Route
                  path="/employees/create"
                  element={<CreateEmployees />}
                ></Route>
                <Route
                  path="/employees/list"
                  element={<ListEmployees />}
                ></Route>
                <Route
                  path="/employees/transfer"
                  element={<TransferRockobitsForm />}
                ></Route>
                <Route path="/subscriptions/get" element={<Stripe />}></Route>
                <Route
                  path="/subscriptions/cancel"
                  element={<Cancel />}
                ></Route>
                <Route path="/success" element={<Success />}></Route>
                <Route path="/rockobits/buy" element={<Rockobits />}></Route>
                <Route path="/rockobits/sale" element={<RockobitsSale />}></Route>
                <Route
                  path="/rockobits/success"
                  element={<RockobitsSuccess />}
                ></Route>
                <Route path="*" element={<div> Page not found</div>} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
