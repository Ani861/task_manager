import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({ username: email, password });
      const token = response.data?.access_token || response.data?.token;
      if (!token) {
        throw new Error("Invalid authentication response");
      }
      login(token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Unable to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Username
                  </label>
                  <input
                    id="loginEmail"
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="loginPassword"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>
              <div className="mt-3 text-center">
                <span>Don't have an account? </span>
                <button type="button" className="btn btn-link p-0" onClick={() => navigate("/register")}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
