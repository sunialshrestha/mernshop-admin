import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import "./login.scss";
import { Alert, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errorMsg, loginSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  useEffect(() => {
    if (loginSuccess) {
      location.state ? navigate(location.state.from) : navigate("/");
    }
  }, [loginSuccess, location, navigate]);

  return (
    <div className="login">
      <form className="loginForm">
        <div className="loginItem">
          <h1 className="loginTitle">Login</h1>
        </div>
        <div className="error">
          {error && <Alert severity="error"> {errorMsg} </Alert>}
        </div>
        <div className="loginItem">
          <label>Username:</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="loginItem">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="loginItem">
          {isFetching ? (
            <CircularProgress />
          ) : (
            <button onClick={handleClick} className="loginButton">
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
