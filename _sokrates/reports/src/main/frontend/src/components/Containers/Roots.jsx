import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

//avoir un header sur tous les pages
export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
