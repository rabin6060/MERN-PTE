import React, { useRef, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { deleteFailure, deleteStart, deleteSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'

const Profile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({ })
    const usernameRef = useRef(null)
    const emailRef = useRef(null)

    
   const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
   }
   console.log(formData);
   const handleEnableEdit = (ref) => {
        ref.current.focus()
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch(updateStart())
        try {
            const res = await axios.put(`http://localhost:8000/api/user/update/${currentUser._id}`,formData)
            if(!res.data){
                dispatch(updateFailure(res.data))
            }
            dispatch(updateSuccess(res.data))
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }
    const handleDelete = async()=>{
        dispatch(deleteStart())
        try {
           const res= await axios.delete(`http://localhost:8000/api/user/delete/${currentUser._id}`)
           if(!res) {
            dispatch(deleteFailure(res.data))
           }
            dispatch(deleteSuccess())
        } catch (error) {
            dispatch(deleteFailure(error.message))
        }
    }
  return (
    <div className='w-full h-[80vh]'>
        <div className='w-full sm:max-w-[60%] m-auto h-full flex items-center justify-center '>
            {
                currentUser &&
                <div className='max-w-[80%] m-auto my-20 flex flex-col gap-10'>
                    <h1 className='text-2xl sm:text-4xl text-center font-[700]'>Profile</h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-5'>
                        <div className='max-w-[80%] flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <label>Username: </label>
                                <input ref={usernameRef} type="text" id="username" defaultValue={currentUser.username} className='w-full border-none outline-none bg-transparent cursor-not-allowed' onChange={(e)=>handleChange(e)}  />
                            </div>
                            <span className='px-4 py-1 bg-green-300 rounded-lg cursor-pointer' onClick={()=>handleEnableEdit(usernameRef)}>Edit</span>
                        </div>
                         <div className='max-w-[80%] flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <label>Email: </label>
                                <input ref={emailRef} type="text" id="email" defaultValue={currentUser.email} className='w-full border-none outline-none bg-transparent cursor-not-allowed' onChange={(e)=>handleChange(e)}  />
                            </div>
                            <span className='px-4 py-1 bg-green-300 rounded-lg cursor-pointer' onClick={()=>handleEnableEdit(emailRef)}>Edit</span>
                        </div>
                        <div className='max-w-[80%] flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <label>Password: </label>
                                <input type="password" id="password" value={currentUser.username} className='w-[50%] border-none outline-none bg-transparent'  />
                            </div>
                            <span className='px-4 py-1 bg-green-300 rounded-lg cursor-pointer' >Edit</span>
                        </div>
                        <button type='button' onClick={handleDelete} className='w-full px-4 py-2 bg-red-500 text-white text-xl font-[700] border-none rounded-md whitespace-nowrap'>Delete Account</button>
                       <button className='w-full px-4 py-2 bg-green-500 text-white text-xl font-[700] border-none rounded-md'>Update</button>
                    </form>
                </div>
            }
        </div>
    </div>
  )
}

export default Profile