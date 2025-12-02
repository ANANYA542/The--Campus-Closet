import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password");

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          Campus Closet
        </Link>

        <nav className="nav__actions">
          {!isAuthenticated && !isAuthPage && (
            <>
              <Link to="/login" className="btn btn--ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Sign up
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/products" className="btn btn--ghost">
                Listings
              </Link>
              <Link to="/chat" className="btn btn--ghost">
                Chats
              </Link>
              <Link to="/new-arrivals" className="btn btn--ghost">
                New Arrivals
              </Link>
              <Link to="/buyer/dashboard" className="btn btn--ghost">
                Dashboard
              </Link>
              <Link to="/seller/dashboard" className="btn btn--ghost">
                My Items
              </Link>
              <Link to="/profile" className="btn btn--ghost">
                {user?.name || "Profile"}
              </Link>

              <button onClick={logout} className="btn btn--primary">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
