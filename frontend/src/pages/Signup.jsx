import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await signup(form);
      setSuccess("Account created. Please login.");
      setTimeout(() => navigate("/login"), 600);
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <h2>Sign up</h2>
      {error ? <div className="auth__error">{error}</div> : null}
      {success ? <div className="auth__success">{success}</div> : null}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            required
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={onChange}
            className="select"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="auth__actions">
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
        </div>
      </form>
      <p className="muted" style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;


