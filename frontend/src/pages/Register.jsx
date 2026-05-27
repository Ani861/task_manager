import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Register() {
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
      const response = await authService.register({ email, password });
      const token = response.data?.access_token || response.data?.token;
      if (token) {
        login(token);
        navigate("/dashboard", { replace: true });
        return;
      }

      const loginResponse = await authService.login({ username: email, password });
      const loginToken = loginResponse.data?.access_token || loginResponse.data?.token;
      if (!loginToken) {
        throw new Error("Unable to authenticate after registration");
      }
      login(loginToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Unable to register. Please try again.");
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
              <h2 className="card-title mb-4">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="registerEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="registerPassword"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>
              <div className="mt-3 text-center">
                <span>Already registered? </span>
                <button type="button" className="btn btn-link p-0" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
