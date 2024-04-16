import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "../../store/userSlice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/internal";

const Login = () => {
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogin = async (data) => {
    const response = await login(data);
    console.log(data);
    if (response.status === 200) {
      const { _id, email, username } = response.data.user;

      const user = {
        _id,
        email,
        username,
        auth: response.data.auth,
      };
      // console.log(user)

      dispatch(setUser(user));
      localStorage.setItem('username', user.username)
      navigate(-1, {replace:true, state:{from:location}});

    } else if (!response.ok) {
      setError({responseError:response.response.data.message});
      console.log(response.response.data.message);
    }
  };

  return (
    <>
      <LoginForm
        handleLogin={handleLogin}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default Login;
