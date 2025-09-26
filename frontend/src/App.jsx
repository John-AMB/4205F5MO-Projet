import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext/auth-context";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { useState } from "react";

import UserProfile from "./components/userProfile.jsx";
import Inscription from "./components/Inscription.jsx";
import Login from "./components/Login.jsx";
import RootLayout from "./components/Containers/Roots";
import ErrorPage from "./components/Containers/ErrorPage";
import Gallery from "./components/Gallery/Gallery";

function App() {
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);
  // const routerIsLoggedIn = () =>
  //   createBrowserRouter([
  //     {
  //       path: "/",
  //       element: <RootLayout />,
  //       errorElement: <ErrorPage />,
  //       children: [{ path: "", element: <Gallery /> }],
  //     },
  //   ]);
  // const routerIsLoggedOut = () =>
  //   createBrowserRouter([
  //     {
  //       path: "/",
  //       element: <RootLayout />,
  //       errorElement: <ErrorPage />,
  //       children: [{ path: "", element: <Gallery /> }],
  //     },
  //   ]);
  // const [isLoggedIn, setIsLoggedIn] = useState(AuthContext);

  // if (isLoggedIn)
  //   return (
  //     <AuthContext.Provider
  //       value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
  //     >
  //       <RouterProvider router={routerIsLoggedIn()} />
  //     </AuthContext.Provider>
  //   );
  // return (
  //   <AuthContext.Provider
  //     value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
  //   >
  //     <RouterProvider router={routerIsLoggedOut()} />
  //   </AuthContext.Provider>
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserProfile />} />
      {/*Au cas que URL est /user/:userId-> montre UserProfile*/}
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
