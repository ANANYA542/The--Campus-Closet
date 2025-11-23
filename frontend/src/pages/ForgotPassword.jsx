import { useState } from "react";
import authService from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await authService.forgotPassword({ email });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth">
      <h2>Forgot Password</h2>

      {msg && <div className="auth__success">{msg}</div>}
      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={submit}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn btn--primary">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
