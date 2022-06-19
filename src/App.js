import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Institution from "./pages/Institution";
import Institutions from "./pages/Institutions";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Admin from "./pages/Admin/Admin";
import { Provider } from "jotai";

export default function App() {
  return (
    <>
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/institution/:id" element={<Institution />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
