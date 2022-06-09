import React, { useContext } from "react";
import useInput from "../utils/useInput";
import AuthContext from "../context/auth/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./css/Login.module.css";

const Login = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    value: enteredEmail,
    isVaild: enteredEmailIsValid,
    hasError: emailInputHasError,
    reset: resetEmailInput,
    valueChangeHandler: eamilChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isVaild: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    reset: resetPasswordInput,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = true;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = false;
  }

  const emailInputClassName = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClassName = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log(enteredEmail, enteredPassword);
    console.log({ user });

    let authUser = user.find((elem) => {
      return elem.email === enteredEmail;
    });

    if (authUser) {
      if (enteredPassword === authUser.password) {
        setLoggedIn([authUser]);
        localStorage.setItem("loggedIn", JSON.stringify(authUser));
        alert("Login Success");
      }
    }

    resetEmailInput();
    resetPasswordInput();

    navigate("/");
  };

  return (
    <form className="form_login" onSubmit={formSubmissionHandler}>
      <div className={classes.form_content}>
        <div className={classes.login_heading}>LogIn</div>
        <div className={emailInputClassName}>
          <input
            type="email"
            id="email"
            onChange={eamilChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            placeholder="Enter your Email"
          />
        </div>
        {emailInputHasError && <p className="error-text">Enter Valid Email</p>}
        <div className={passwordInputClassName}>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
        </div>
        {passwordInputHasError && (
          <p className="error-text">Enter Valid Email</p>
        )}
        <div className="form-actions">
          <button disabled={formIsValid}>Login</button>
        </div>
        <div className={classes.login}>
          <strong> Don't have account </strong>
          <NavLink to="/register"> Register Here </NavLink>
        </div>
      </div>
    </form>
  );
};

export default Login;
