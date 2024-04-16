import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, setUser } from "../store/userSlice/userSlice";
import api from "../api/internal";

export const useAutoLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get('/getUserProfile', {
            baseURL:process.env.REACT_APP_INTERNAL_API_PATH,
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }        
        });

        const { data: user } = response;
        dispatch(setUser(user));
      } catch (error) {
        // console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message;
        if (
          errorMessage === "Unauthorized" &&
          (error.response.status === 401 || error.response.status === 500)
        ) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
                  {
                    withCredentials: true,
                    validateStatus:false
                  }
                );
                if (response.status === 200) {
                  // console.log(response)
                  const user = {
                    _id: response?.data?.user?._id,
                    emial: response?.data?.user?.email,
                    username: response?.data?.user?.username,
                    auth: response?.data?.auth,
                  };
                  dispatch(setUser(user));
                }else{
                    throw Error
                }
                
            } catch (error) {
                // console.log(error)
                dispatch(resetUser());
                // return Promise.reject(error)
            }
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading;
};
