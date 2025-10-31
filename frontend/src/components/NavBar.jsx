import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">Campus Closet</Link>
        <nav className="nav__actions">
          {!isAuthPage && (
            <>
              <Link to="/login" className="btn btn--ghost">Login</Link>
              <Link to="/signup" className="btn btn--primary">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;


