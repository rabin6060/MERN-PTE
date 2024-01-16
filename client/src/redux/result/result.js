import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isSubmitted :false
}

const resultSlice = createSlice({
    name:'result',
    initialState,
    reducers:{
        setSubmit:(state,action)=>{
            state.isSubmitted = action.payload
        },
        resetSubmit:(state,action)=>{
            state.isSubmitted = action.payload
        }
    }
})
export const {setSubmit,resetSubmit}  = resultSlice.actions
export default resultSlice.reducer