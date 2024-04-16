import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditOpen:false,
    isDeleteOpen:false
}

const modalSlice = createSlice({
    name:'modal',
    initialState:initialState,
    reducers:{
        openModal:(state,action)=>{
            state.isEditOpen = true
        },

        closeModal:(state,action)=>{
            state.isEditOpen = false
        },
        openDeleteModal:(state,action)=>{
            state.isDeleteOpen = true
        },

        closeDeleteModal:(state,action)=>{
            state.isDeleteOpen = false
        }
    }
})


export const {openModal, closeModal, openDeleteModal, closeDeleteModal} = modalSlice.actions

export default modalSlice.reducer