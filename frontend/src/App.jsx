import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <div className="text-3xl font-bold underline text-red-500">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
