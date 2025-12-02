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
              <Link to="/shop" className="btn btn--ghost">
                Shop
              </Link>
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
              <Link to="/shop" className="btn btn--ghost">
                Shop
              </Link>
              <Link to="/products" className="btn btn--ghost">
                Listings
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

              <Link to="/cart" className="btn btn--ghost nav__cart">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z"
                    fill="currentColor"
                  />
                </svg>
                Cart
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
