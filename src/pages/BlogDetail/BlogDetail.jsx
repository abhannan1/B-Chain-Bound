import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import  { deleteBlog, getBlogDetails, getComments, postComment }  from '../../api/internal'
import styles from './BlogDetail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import CommentsList  from '../../components/CommentsList/CommentsList'
import { EditSubmitBlog } from '../EditSubmitBlog/EditSubmitBlog'
import { openDeleteModal, openModal } from '../../store/modalSlice/modalSlice'
import DeleteModal from '../../components/DeleteModel/DeleteModel'


export const BlogDetail = () => {
    const [blog, setBlog] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState([])
    const [ownsBlog, setOwnsBlog] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const blog_id = id
    const author = useSelector((store)=>store.user.username)
    const author_id = useSelector((store)=> store.user._id)
    const isEditOpen = useSelector((store)=>store.modal.isEditOpen)
    const isDeleteOpen = useSelector((store)=>store.modal.isDeleteOpen)
    const dispatch = useDispatch()

    


    useEffect(()=>{
        if(isMounted.current) return;
        (async function getBlogDTO(){
            try {
                const blogResponse = await getBlogDetails(id)
                // console.log(blogResponse)
                if(blogResponse.status === 200){
                    setBlog(blogResponse?.data?.blogDetailsDTO)
                    setOwnsBlog(author_id === blogResponse?.data?.blogDetailsDTO.author_id)
                }

                const commentResponse = await getComments(id)
                // console.log(commentResponse)
                if(commentResponse.status === 200){
                    setComments(commentResponse.data.comments)
                }
                
            } catch (error) {
                console.log("this is error")
                console.log(error)

            }
        })()

            isMounted.current = true
        return ()=>{
            setIsLoading(false)
            setBlog([])
            setComments([])
            isMounted.current = false
        }

    },[reload])


    // useEffect(()=>{
    //     // if(isMounted.current) return;
    //     (async function getCommentsApi(){
    //         try {
    //             const response = getComments(id)
    //             if(response){
    //                 setComments(comments)
    //                 console.log(response)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })()

    //         isMounted.current = true
    //     return ()=>{
    //         setComments([])
    //         setIsLoading(false)
    //         isMounted.current = false
    //     }

    // },[])


    const postCommentHandler = async() =>{
        const data = {
            content:newComment,
            author:author_id,
            blog:blog_id,
        }

        try {
            const response = await postComment(id, data)
            if(response.status === 201){
                setNewComment("")
                setReload(!reload)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deleteBlogHandler = async() =>{
        try {
            const response = await deleteBlog(blog_id)
            if(response.status===200){
                navigate('/blogs', {replace:true, state:{from:location}})
            }
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <>
    {isEditOpen 
    &&
    <EditSubmitBlog 
        editable = {true} 
        blog={blog}
    />
}
    {isDeleteOpen 
    &&
    <DeleteModal id={blog_id} deleteBlogHandler = {deleteBlogHandler}/>
    }
    <div className={styles.blogDetailWrapper}>
    <div key={blog?._id} className={styles.left} >
        <h3 className={styles.title}>{blog?.title?.toUpperCase()}</h3>
        <div className={styles.meta}>
            <p>
            @{blog?.authorName + ' on ' + new Date(blog?.createdAt).toDateString()}
            </p>
        </div>
        <div className={styles.photo}>
            <img src={blog?.photo} alt="" className={styles.img}/>
        </div>
        <p className={styles.content}>
            {/* <pre> */}
                {blog?.content}
            {/* </pre> */}
            </p>
        {ownsBlog && (
            <div className={styles.controls}>
                <button className={styles.editBtn} onClick={()=>{dispatch(openModal())}}>Edit</button>
                <button className={styles.deleteBtn} onClick={()=>{dispatch(openDeleteModal())}}>Delete</button>
            </div>
        )}
    </div>  
    <div className={styles.right}>
        <div className={styles.commentsWrapper}>
            <CommentsList comments={comments}/>
            <div className={styles.postCommentCont}>
                <input 
                className={styles.commentInput}
                placeholder='comment here'
                value={newComment}
                onChange={(e)=>setNewComment(e.target.value)}
                type="text" 
                />
                <button className={styles.postCommentBtn} onClick={postCommentHandler}>Post</button>
            </div>
        </div>
    </div>
    </div>
    </>
    )
}
