import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext/auth-context";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { useState } from "react";

import UserProfile from "./components/userProfile.jsx";
import Inscription from "./components/Inscription.jsx";
import RootLayout from "./components/Containers/Roots";
import ErrorPage from "./components/Containers/ErrorPage";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Gallery />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        {/*Au cas que URL est /user/:userId-> montre UserProfile*/}
        <Route path="/inscription" element={<Inscription />} />
      </Route>
    </Routes>
  );
}

export default App;
