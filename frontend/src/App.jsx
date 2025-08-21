import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./utils/Root";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requirRole={["admin"]}>
                <h1>Admin dashboard</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/dashboard"
            element={<h1>Customer dashboard</h1>}
          />
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
