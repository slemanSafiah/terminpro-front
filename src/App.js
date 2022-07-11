import { useEffect, useState } from "react";
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
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Provider } from "jotai";
import "./styles.css";
import { HashLoader } from "react-spinners";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${"6LdjnIkgAAAAAOBJX4J2k-Ir3YPDu_Of32E7AT45"}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  if (loading) {
    return (
      <>
        <HashLoader
          color="#1088e9"
          size={100}
          style={{
            position: "absolute",
            top: "50%",
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </>
    );
  }

  return (
    <>
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/institution/:id" element={<Institution />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/institutions" element={<Institutions />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/success" element={<Success />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/failure" element={<Failure />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
