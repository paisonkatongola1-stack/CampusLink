import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Welcome To CampusLink</h1>
        <p>Connecting Students, Business & Accommodations</p>

        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;