import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../services/authService";

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await authService.resetPassword({ token, newPassword: password });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth">
      <h2>Reset Password</h2>

      {msg && <div className="auth__success">{msg}</div>}
      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={submit}>
        <div className="field">
          <label>New Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn--primary">Update Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
