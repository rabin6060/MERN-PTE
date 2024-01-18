import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logInStart:(state)=>{
            state.loading = true
        },
        logInSuccess:(state,action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null
        },
        logInFailure:(state,action)=>{
            state.loading = false,
            state.currentUser = null,
            state.error =  action.payload
        },
        signOutStart:(state)=>{
            state.loading = true
        },
        signOutSuccess:(state)=>{
            state.loading = false,
            state.currentUser = null,
            state.error = null
        },
        signOutFailure:(state,action)=>{
            state.loading = false,
            state.currentUser = null,
            state.error =  action.payload
        },
        updateStart:(state)=>{
            state.loading = true
        },
        updateSuccess:(state,action)=>{
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null
        },
        updateFailure:(state,action)=>{
            state.loading = false,
            state.currentUser = null,
            state.error = action.payload
        },
        deleteStart:(state)=>{
            state.loading = true
        },
        deleteSuccess:(state)=>{
            state.loading = false,
            state.currentUser = null,
            state.error = error
        },
        deleteFailure:(state,action)=>{
            state.loading = false,
            state.currentUser = null,
            state.error= action.payload
        }

    }
})
export const {logInStart,logInSuccess,logInFailure,signOutFailure,signOutStart,signOutSuccess,updateFailure,updateStart,updateSuccess,deleteFailure,deleteStart,deleteSuccess,updateSessionFailure,updateSessionStart,updateSessionSuccess} = userSlice.actions
export default userSlice.reducer