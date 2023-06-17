import { useState, useEffect } from "react";
import "./register.scss";
import FormInput from "../../components/forminput/FormInput";

import { registerUser, resetUserErrorData } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",

      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const dispatch = useDispatch();
  const { isFetching, error, errorMsg, registerSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    resetUserErrorData(dispatch);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(dispatch, {
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="error">
          {error && <Alert severity="error"> Error: {errorMsg} </Alert>}
          {registerSuccess && (
            <Alert severity="success"> User registered Successfully! </Alert>
          )}
        </div>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {isFetching ? (
          <CircularProgress />
        ) : (
          <button className="registerButton">Submit</button>
        )}
      </form>
    </div>
  );
};

export default Register;
