import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/global.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Error from "./Pages/Error/Error";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.auth);
  const tokenStored = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {(token || tokenStored) && 
          <Route path="/profile" element={<Profile />} />
        }
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
