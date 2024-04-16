import React, { Children, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const PublicRoute = ({isAuth, children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isVerified, setIsVerified] = useState()

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
