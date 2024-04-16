import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import signupSchema from "../../pages/schemas/signupSchema";

const RegisterForm = ({ handleSignUp, setError, error }) => {
  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },

      validationSchema: signupSchema,

      onSubmit: (values) => {
        const data = {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        handleSignUp(data);
      },
    });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: values.name,
  //     username: values.username,
  //     email: values.email,
  //     password: values.password,
  //     confirmPassword: values.confirmPassword,
  //   };
  //   handleSignUp(data);
  // };

  return (
    <div className={styles.formWrapper}>
      <form action="" id="form" className={styles.form}>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your full name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name && touched.name ? 1 : undefined}
          errormessage={errors.name}
        />
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your user name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          error={
            errors.confirmPassword && touched.confirmPassword ? 1 : undefined
          }
          errormessage={errors.confirmPassword}
        />
        {!errors.password &&
        !errors.username &&
        !errors.name &&
        !errors.email &&
        !errors.confirmPassword
          ? error && <p className={styles.errorMsg}>{error.responseError}</p>
          : ""}{" "}
        <button
          type="submit"
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            !values.name ||
            !values.email ||
            !values.username ||
            !values.password ||
            !values.confirmPassword ||
            errors.name ||
            errors.email ||
            errors.username ||
            errors.password ||
            errors.confirmPassword
          }
        >
          Create Account
        </button>
      </form>
      <Link>
        <p className={styles.forgottenPassword}> Already have an account? </p>
      </Link>
      <div className={styles.separator}></div>

      <Link to="/login" className={styles.link}>
        Login
      </Link>
    </div>
  );
};

export default RegisterForm;
