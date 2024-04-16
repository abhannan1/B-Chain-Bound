import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import loginSchema from "../../pages/schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../../api/internal";

const LoginForm = ({ setError, handleLogin, error }) => {
  const {
    values,
    touched,
    // handleSubmit,
    handleBlur,
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,

    // onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    //   setUser(values)
    //   handleLogin(user)
    // },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: values.username,
      password: values.password,
    };

    handleLogin(data);
  };

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  //   console.log(user);
  // };

  // const handleSubmits = (e) => {
  //   e.preventDefault();
  //   setError({});
  //   try {
  //     if (!user.username && !user.password) {
  //       return setError({ errorAll: "Please enter all fields" });
  //     }

  //     if (!user.username) {
  //       return setError({ errorUsername: "Please enter username" });
  //     }

  //     if (!user.password) {
  //       return setError({ errorPassword: "Please enter password" });
  //     }

  //     setError({});
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={styles.formWrapper}>
      <form
        action=""
        id="form"
        className={styles.form}
        // onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your user name"
          label="User Name:"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          label="Password:"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        {!errors.password && !errors.username
          ? error && <p className={styles.errorMsg}>{error.responseError}</p>
          : ""}
        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            !values.username ||
            !values.password ||
            errors.username ||
            errors.password
          }
        >
          Log In
        </button>
      </form>
      <Link>
        <p className={styles.forgottenPassword}> Forgotten Password? </p>
      </Link>
      <div className={styles.separator}></div>
      <Link to="/signUp" className={styles.link}>
        Create Account{" "}
      </Link>
    </div>
  );
};

export default LoginForm;
