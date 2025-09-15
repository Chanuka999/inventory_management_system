import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./utils/Root";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./components/Categories";
import Supliers from "./components/Supliers";
import Product from "./components/Product";
import Logout from "./components/Logout";
import Users from "./components/Users";
import CustomerProducts from "./components/CustomerProducts";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Summry from "./components/Summry";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoutes requirRole={["admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Summry />} />

            <Route path="categories" element={<Categories />} />

            <Route path="products" element={<Product />} />

            <Route path="suppliers" element={<Supliers />} />

            <Route path="orders" element={<h1>orders</h1>} />

            <Route path="users" element={<Users />} />

            <Route path="profile" element={<h1>profile</h1>} />

            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/customer-dashboard" element={<Dashboard />}>
            <Route index element={<CustomerProducts />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="logout" element={<Logout />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route
            path="/unauthorized"
            element={
              <p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
