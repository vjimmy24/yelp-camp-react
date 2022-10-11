import { useEffect, useState, Fragment } from "react";
import { Routes, Route, Router, RouterProvider } from "react-router-dom";
import Test from "./components/test/Test";
import CampgroundsPage from "./routes/Campgrounds/CampgroundsPage";
import NewCampground from "./routes/Campgrounds/NewCampground";
import HomePage from "./routes/HomePage";

// const routerProvider = (

// );

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="campgrounds" element={<CampgroundsPage />} />
      <Route path="campgrounds/new" element={<NewCampground />} />
    </Routes>
  );
};

export default App;
