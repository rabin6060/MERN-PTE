import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    questions: null,
    error:null
}

const questionSlice = createSlice({
    name:'question',
    initialState,
    reducers:{
        questionFetchStart : (state)=>{
            state.loading = true
        },
        questionFetchSuccess : (state,action)=>{
            state.loading = false,
            state.questions = action.payload,
            state.error = null
        },
        questionFetchError : (state,action)=>{
            state.loading = false,
            state.questions = null,
            state.error = action.payload
        },

    }
})
export const {questionFetchError,questionFetchStart,questionFetchSuccess} = questionSlice.actions
export default questionSlice.reducer