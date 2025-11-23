import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <h2>Login</h2>

      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="input"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="input"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        <div style={{ textAlign: "right", marginTop: "-8px" }}>
          <Link to="/forgot-password" className="muted">
            Forgot password?
          </Link>
        </div>

        <div className="auth__actions">
          <button className="btn btn--primary" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <p className="muted" style={{ marginTop: 12 }}>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
