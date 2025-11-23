import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import authService from "../services/authService";

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await authService.resetPassword({ token, newPassword: password });
      setMsg(res.data.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="info-section">
        <div className="info-icon">🔐</div>
        <h2>Reset Password</h2>
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          Choose a new password for your account
        </p>
      </div>

      {msg && (
        <div className="auth__success">
          {msg}
          <div style={{ marginTop: '1rem' }}>
            <Link to="/login" className="btn btn--primary" style={{ width: '100%' }}>
              Go to Login
            </Link>
          </div>
        </div>
      )}
      
      {error && <div className="auth__error">{error}</div>}

      {!msg && (
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="auth__actions">
            <button 
              type="submit" 
              className="btn btn--primary" 
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;