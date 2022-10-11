import { useEffect, useState, Fragment } from "react";
import { Routes, Route, Router, RouterProvider } from "react-router-dom";
import Test from "./components/test/Test";
import HomePage from "./routes/HomePage";

const routerProvider = (
  <Routes>
    <Route path="/" element={<HomePage />}></Route>
  </Routes>
);

const App = () => {
  return <Fragment>{routerProvider}</Fragment>;
};

export default App;
