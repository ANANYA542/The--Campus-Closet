import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await authService.forgotPassword({ email });
      setMsg(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="info-section">
        <div className="info-icon">🔑</div>
        <h2>Forgot Password</h2>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          Enter your email to receive a password reset link
        </p>
      </div>

      {msg && <div className="auth__success">{msg}</div>}
      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth__actions">
          <button 
            type="submit" 
            className="btn btn--primary" 
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <Link to="/login" className="btn btn--ghost">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;