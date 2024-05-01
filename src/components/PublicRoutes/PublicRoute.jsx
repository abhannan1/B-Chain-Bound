import React, { Children, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export const PublicRoute = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isVerified, setIsVerified] = useState()
    const isAuth = useSelector((state) => state.user.auth);


    useEffect(()=>{
        if(isAuth){
            console.log(isAuth)
            navigate('/blogs', {replace:true, state:{from:location}})
        }else{
            setIsVerified(false)
        }
    })

    if(isVerified){
        console.log(isVerified)
        return null
    }

  return (
    <>{children}</>
  )
}
