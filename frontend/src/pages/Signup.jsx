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
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <div className="info-section">
        <h2>Create Account</h2>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          Join your campus marketplace today
        </p>
      </div>

      {error && <div className="auth__error">{error}</div>}
      {success && <div className="auth__success">{success}</div>}

      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={onChange}
            required
            className="input"
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@university.edu"
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
            placeholder="At least 6 characters"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
            className="input"
          />
        </div>

        <div className="field">
          <label htmlFor="role">I want to</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={onChange}
            className="select"
          >
            <option value="buyer">Buy items</option>
            <option value="seller">Sell items</option>
          </select>
        </div>

        <div className="auth__actions">
          <button 
            type="submit" 
            className="btn btn--primary" 
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </div>
      </form>

      <p className="muted text-center" style={{ marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;