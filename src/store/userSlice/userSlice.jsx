import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    username:localStorage.getItem('username'),
    email:'',
    auth:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            const {_id, email, username, auth} = action.payload
            state._id = _id || "";
            state.username = username || localStorage.getItem('username');
            state.email = email || "";
            state.auth = auth;
        },
        resetUser: (state, action) =>{
            state._id = '';
            state.username = '';
            state.email = '';
            state.auth = false      
        }
    }
})


export const {setUser, resetUser} = userSlice.actions

export default userSlice.reducer;