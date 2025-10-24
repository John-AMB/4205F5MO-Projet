import "./Header.css";
import { Link } from "react-router-dom";
import UserButton from "../UserButton/UserButton";
import LanguageSwitcher from "../LanguageSelector/LanguageSelector";
const Header = ({ onSearchChange }) => {
  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header">
      <div className="trois">
        <img href="/" src="/general/logo.png" className="logo" />
        <Link className="home" to="/">
          Home
        </Link>
        <Link className="create" to="/create">
          Create
        </Link>
      </div>
      <form className="search">
        <div className="form">
          <img src="/general/search.svg" alt="Search Icon" />
          <input type="text" placeholder="Search" onChange={handleSearch} />
        </div>
      </form>
      <UserButton />
      {/*<LanguageSwitcher />*/}
    </header>
  );
};
export default Header;
