import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserProfile from "./components/userProfile.jsx";
import Inscription from "./components/Inscription.jsx";
import RootLayout from "./components/Containers/Roots";
import ErrorPage from "./components/Containers/ErrorPage";
import Gallery from "./components/Gallery/Gallery";
import CreateItem from "./components/CreateItem/CreateItem.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import ChangePassword from "./components/ModificationProfile/ChangePassword/ChangePassword.jsx";
import ModificationProfile from "./components/ModificationProfile/ModificationProfile.jsx";
import ChangeBio from "./components/ModificationProfile/ChangeBio/ChangeBio.jsx";
import ChangeProfilePhoto from "./components/ModificationProfile/ChangePhoto/ChangePhoto.jsx";
import DeleteAccount from "./components/ModificationProfile/SupprimeAccount/SupprimeAccount.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Gallery />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        {/*Au cas que URL est /user/:userId-> montre UserProfile*/}
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/change-bio" element={<ChangeBio />} />
        <Route path="/modification" element={<ModificationProfile />} />
        <Route path="/change-photo" element={<ChangeProfilePhoto />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
