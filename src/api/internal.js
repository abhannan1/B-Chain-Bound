import axios from "axios";


const api = axios.create({
    baseURL:process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

api.interceptors.response.use(
    (config)=> config,
    async (error) => {
        const originalReq = error.config;
        
        const errorMsg = error.response && error.response.data && error.response.data.message
        
        if(errorMsg === "Unauthorized" && error?.response?.status === 401 && !originalReq?._isRetry){
            try{
                await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,{
                    withCredentials:true
                })
                console.log("refresh")
                await api.request(originalReq)
                
            }catch(error){
                console.log("refresh error")
                return error
            }
        }
        throw error
    }
)

export default api

const apiEndPoint = axios.create({
    baseURL:process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

apiEndPoint.interceptors.response.use(
    (response)=> response,
    (error) =>  Promise.reject(error)
)




// Authentication APIs
export const login = async (data) => {
    
    let response
    try{
        response = await apiEndPoint.post('/login', data)
    }catch(error){
        return error
    }
    return response
}

export const logout = async() =>{

    try{
         const response = await api.post('/logout')
         return response
    }catch(error){
        return error
    }

}

export const signUp = async(data) =>{

    try{
        const response = await apiEndPoint.post('/register', data)
        // console.log(response)
        if (response.status === 201){
            console.log(response)
            return response

        }

    }catch(error){
        return error
    }
}




// Blog APIs
export const getBlogs = async() =>{
    try{
        const response = await api.get('/blog/getAllBlogs')
        if(response){
            return response
        }
        
    }catch(err){
        throw err
    }

}

export const getBlogDetails = async(id) =>{
    try{
        const response = await api.get(`/blog/${id}`, {
            validateStatus:false
        })
        if(response){
            return response
        }
        
    }catch(err){
        throw err
    }

}

export const submitBlog = async(data) =>{
    let response
    try{
        response = await api.post('/blog/addBlog', data, {
            validateStatus:false
        })
    }catch(err){
        return err
    }
    
    return response
}

export const editBlog = async(id,data) =>{
    let response
    try{
        response = await api.put(`/blog/${id}`,data, {
            validateStatus:false
        })
    }catch(err){
        return err
    }
    
    return response
}
export const deleteBlog = async(id) =>{
    let response
    try{
        response = await api.delete(`/blog/${id}`, {
            validateStatus:false
        })
    }catch(err){
        return err
    }
    
    return response
}




// Comments APIs
export const getComments = async(id) =>{
    let response
    try{
        response = await api.get(`/comment/all/${id}`, {
            validateStatus:false
        })
    }catch(err){
        return console.log(err)
    }
    
    return response
}

export const postComment = async(id, data) =>{
    let response
    try{
        response = await api.post(`/comment/addComment/${id}`, data, {
            validateStatus:false
        })
    }catch(err){
        return console.log(err)
    }
    
    return response
}

export const editComment = async(id, data) =>{
    let response
    try{
        response = await api.put(`/comment/${id}`, data, {
            validateStatus:false
        })
    }catch(err){
        return console.log(err)
    }
    
    return response
}

export const deleteComment = async(id) =>{
    let response
    try{
        response = await api.delete(`/comment/${id}`, {
            validateStatus:false
        })
    }catch(err){
        return console.log(err)
    }
    
    return response
}



