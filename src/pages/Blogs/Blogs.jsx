import React, { useEffect, useRef, useState } from 'react'
import api , { getBlogs } from '../../api/internal'
import styles from './Blogs.module.css'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUser } from '../../store/userSlice/userSlice'

export const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isMounted.current) return;
        (async function cryptoApiCall (){
            if(isMounted.current) return;
            setIsLoading(true)

            try {
                const response = await api.get('/blog/getAllBlogs')
                console.log(response)
                if(response.status === 200){
                    setBlogs(response.data.blogsDTO)
                    setIsLoading(false)
                }
               
                // if(response.response.status === 401 || 500 ){
                //     navigate("/", {replace:true, state:{from:location}})
                //     dispatch(resetUser())

                // }


            } catch (error) {
                console.log(error)
                setIsLoading(false)
                if(error.status === 401){
                    dispatch(resetUser)
                }
            }
 
        })()
        isMounted.current = true

        return () => {
            isMounted.current = false
            setIsLoading(false)
            setBlogs([])
        }
    },[])


    useEffect(()=>{
        console.log(blogs)
    })

if(blogs.length === 0){
    return(
        <div className={styles.container}>
            <h1 className={styles.heading}>Recent Blogs</h1>
        </div>
    )
}


  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Recent Blogs</h1>
        {blogs.map((blog,index)=>{
            return(
                <div key={blog._id} className={styles.card} onClick={()=>navigate(`/blog/${blog._id}`, {replace:true, state:{from:location}})}>
                    <h3 className={styles.title}>{blog?.title.toUpperCase()}</h3>
                    <img src={blog.photo} alt="" className={styles.img}/>
                    <div className={styles.content}>{blog.content}</div>
                </div>
            ) 
        })}
    </div>
  )
}
