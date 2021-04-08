import { Link } from "react-router-dom";
import { firebaseClient } from "../firebase/firebaseClient";
import useAuth from "../firebase/useAuth";

import "../style/Header.css";

const Header = () => {
  const { user } = useAuth();

  const handleSignOut = () => {
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      })
      .catch((err) => {
        window.alert(`Sign out Failed - ${err}`);
      });
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__name">
          <img className="header__icon" src="/2488980.png" alt="Header logo" />
          Budget tracker
        </div>
        <nav className="header__nav">
          {!user && (
            <>
              <Link className="header__link" to="/login">
                Login
              </Link>
              <Link className="header__link" to="/signup">
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <Link className="header__link" to="/">
                Home
              </Link>
              <button onClick={handleSignOut} className="header__exit">
                Sign out
              </button>
            </>
          )}
        </nav>
        <div className="header__user">User: {user?.email || "----"}</div>
      </div>
    </header>
  );
};

export default Header;
