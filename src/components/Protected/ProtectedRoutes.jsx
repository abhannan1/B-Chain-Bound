import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/internal'
import { useDispatch } from 'react-redux'
import { resetUser } from '../../store/userSlice/userSlice'

const ProtectedRoutes = ({isAuth, children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isVerified, setIsVerified] = useState(false)
    


    // useEffect(()=>{
    //     (async function initialize (){
    //         console.log("Auth is running")
    //         console.log(isAuth)
    //         try {
    //             await api.get('/getUserProfile')
    //         } catch (error) {
    //             console.log(error)
    //             const errorMessage = error.response && error.response.data && error.response.data.message;
    //             if (
    //                 errorMessage === 'Unauthorized' &&
    //                 (error.response.status === 401 || error.response.status === 500)){
    //                     dispatch(resetUser())
    //                     navigate('/', {replace:true, state:{from:location}})
    //             }
    //         }
                
    //     })()
    // })

        useEffect(()=>{
        if(!isAuth){
            navigate('/login', {replace:true, state:{from: location}})
        }else{
            setIsVerified(true)
        }
    })

    if(!isVerified){
        return null
    }
    
    else{
        return children;
    }
}

export default ProtectedRoutes
