import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import {editBlog, submitBlog } from '../../api/internal'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './EditSubmitBlog.module.css' 
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/modalSlice/modalSlice'
import { debounce } from 'lodash'

export const EditSubmitBlog = ({editable=false, blog}) => {
    const [title, setTitle] = useState(editable ? blog?.title || "" : "")
    const [content, setContent] = useState(editable ? blog?.content || "" : "")
    const [photo, setPhoto] = useState(editable ? blog?.photo || "" : "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    

    function handlePhoto(e) {
        const file = e.target.files[0]
        if (file) {
            try {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setPhoto(reader.result)
                }
            } catch (error) {
                setPhoto("")
            }
        }
    }

const submitHandler = debounce(async() =>{
    let data
    if (photo.includes('storage')){
        data = {
            title,
            content,
        }
    }else{
        data = {
            title, content, photo
        }
    }
    
    let response
    try {
        if (editable){
            response = await editBlog(blog?._id, data)
        }else{
            response = await submitBlog(data)
        }
        console.log(response)
        if(response.status === 201 || 204 ){
            toast.success(`Blog ${editable? "edited" : "added"}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } else{
            throw Error
        }
        
        setTimeout(() => {
                dispatch(closeModal())
                navigate('/blogs', {replace:true, state:{from:location}})
                setPhoto("")
            }, 3000);

    } catch (error) {
            toast.error(`failed to ${editable? "edit" : "add"} the blog please retry!`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                bodyClassName:"custom-toast",

                transition: Bounce,
                });
                setPhoto("")
        setTimeout(() => {
            dispatch(closeModal())
            navigate('/blogs', {replace:true, state:{from:location}})
        }, 3000);
    }
})

  return (
    
<div 
className={styles.modalOverlay} 
style={editable ? modalStyles.openModalOverlay : {}}
>
    <div 
    className={styles.formWrapper} 
    style={editable ? modalStyles.modalFormWrapper : {}}
    >

        <h1>{editable? "Edit Your Blog" :"Sumit Your Blog"}</h1>
        <Input
        type="text" 
        name='title'
        id='title'
        value = {title}
        placeholder='Blog Title'
        onChange={(e)=>setTitle(e.target.value)}
        style={{background:"transparent", color:"white", border:"1px solid white", width:"100%"}}
        labelStyle={{backgroundColor:"transparent", padding:"0px", background:"transparent"}}
        wrapperStyle={{background:"transparent"}}
        />
        <textarea
        type="text" 
        name='content'
        id='content'
        value={content}
        rows={8}
        placeholder='Write in detail about your blog here...'
        onChange={(e)=>setContent(e.target.value)}
        className={styles.content}
        />
        <input 
        placeholder=''
        type="file" 
        name='photo'
        id='photo'
        onChange={(e)=>handlePhoto(e)}
        className={styles.photoInput}
        />
        {photo !== '' ? <img src={photo} alt="" className={styles.photo}/> : ''}
        <div className={styles.controls}>
            <button 
            className={styles.submit}
            type='submit'
            onClick={submitHandler}
            disabled={!editable && (!title || !content || !photo) }
            >{editable ? "edit" : "Add Blog"}</button>
            {editable && <button className={styles.cancelBtn} onClick={()=>{dispatch(closeModal())}}>Cancel</button>}
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            stacked
            style={{backgroundColor:"transparent",background:"transparent"}}
            
            // transition: Bounce
            />
    </div>
</div>
  )


}

const modalStyles = {
    openModalOverlay:{
        position: "fixed",
        top: "0",
        left: "0",
        height: '100vh',
        zIndex: "9999",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    
    modalFormWrapper:{
        backgroundColor: "transparent",
        marginTop:"0"
    }
}
