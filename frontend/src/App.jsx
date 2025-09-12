import "./App.css";
import { AuthContext } from "./components/AuthContext/auth-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import RootLayout from "./components/Containers/Roots";
import ErrorPage from "./components/Containers/ErrorPage";
import Gallery from "./components/Gallery/Gallery";
import "./App.css";
function App() {
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const routerIsLoggedIn = () =>
    createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [{ path: "", element: <Gallery /> }],
      },
    ]);
  const routerIsLoggedOut = () =>
    createBrowserRouter([
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [{ path: "", element: <Gallery /> }],
      },
    ]);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthContext);

  if (isLoggedIn)
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <RouterProvider router={routerIsLoggedIn()} />
      </AuthContext.Provider>
    );
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={routerIsLoggedOut()} />
    </AuthContext.Provider>
  );
}

export default App;
