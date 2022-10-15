import { useEffect, useState, Fragment } from "react";
import {
  Routes,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Test from "./components/test/Test";
import HomePageNavbar from "./UI/HomePageNavbar";
import LoginPage from "./routes/Auth/LoginPage";
import RegisterPage from "./routes/Auth/RegisterPage";
import CampgroundDetailsPage from "./routes/Campgrounds/CampgroundDetailsPage";
import CampgroundEditPage from "./routes/Campgrounds/CampgroundEditPage";
import CampgroundsPage from "./routes/Campgrounds/CampgroundsPage";
import NewCampground from "./routes/Campgrounds/NewCampground";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";

// const routerProvider = (

// );

const App = () => {
  return (
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
  );
};

export default App;
