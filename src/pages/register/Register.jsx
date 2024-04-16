import React, { useState } from "react";
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { signUp } from "../../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
// import { object } from 'yup'

const Register = () => {
  const navigate =useNavigate()
  const [error, setError] = useState({});
  const dispatch = useDispatch()

  const handleSignUp = async(data) => {

    const response = await signUp(data)
    // console.log(response)
    if(response?.status === 201){
      const {_id, username, email} = response.data.user;
      const user = {
        _id,
        username,
        email,
        auth:response.data.auth
      }

      dispatch(setUser(user))
      localStorage.setItem('username', user.username)
      setError({})
      navigate('/')

    }

    else if( response?.code === "ERR_BAD_REQUEST" ){
      return setError({responseError:response.response.data.message})
    }

  };


  return (
    <>
      <RegisterForm
      handleSignUp={handleSignUp} 
      error={error} 
      setError={setError} />
    </>
  );
};

export default Register;