import { Fragment, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./UI/Navbar";
import LoginPage from "./routes/Auth/LoginPage";
import RegisterPage from "./routes/Auth/RegisterPage";
import CampgroundDetailsPage from "./routes/Campgrounds/CampgroundDetailsPage";
import CampgroundEditPage from "./routes/Campgrounds/CampgroundEditPage";
import CampgroundsPage from "./routes/Campgrounds/CampgroundsPage";
import NewCampground from "./routes/Campgrounds/NewCampground";
import HomePage from "./routes/HomePage";
import AuthContext from "./Context/auth-context";

// const routerProvider = (

// );

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getLoggedinStatus = async () => {
      const res = await fetch("/getUser");
      const data = await res.json();
      if (data.user === undefined) {
        return setIsLoggedIn(false);
      } else {
        console.log(`logged in ${data.user} `);
        setIsLoggedIn(true);
      }
    };
    getLoggedinStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="campgrounds" element={<CampgroundsPage />} />
        <Route path="campgrounds/new" element={<NewCampground />} />
        <Route path="campgrounds/:id" element={<CampgroundDetailsPage />} />
        <Route path="campgrounds/:id/edit" element={<CampgroundEditPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
