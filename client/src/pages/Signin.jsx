import React, {useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logInStart,logInFailure,logInSuccess} from '../redux/user/userSlice'
import axios from 'axios'


const Signin = () => {
   const [formData,setFormData] = useState({
    email:'',
    password:''
   })
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  const handleSubmit = async (e) => {
        e.preventDefault()
        setFormData({
            email:'',
            password:''
        })
        dispatch(logInStart())
        try {
            const res = await axios.post('http://localhost:8000/api/signin',formData)
            if(!res.data) {
                dispatch(logInFailure(res.data))
            }
            dispatch(logInSuccess(res.data))
            navigate('/')
        } catch (error) {
            dispatch(logInFailure(error.message))
        }
    }
  return (
     <div className='w-full h-full bg-white flex items-center justify-center'>
        <div className='w-full sm:max-w-[60%] m-auto h-full flex flex-col items-center my-28 gap-10'>
            <h1 className='text-4xl font-[400]'>Login</h1>
            <form onSubmit={handleSubmit} className='w-full sm:max-w-[50%] flex flex-col justify-center items-center text-center gap-10 px-20'>
                <input className='border-b border-gray-300 p-2 outline-none focus:border-[1px] focus:bg-gray-50 placeholder:text-center text-center' type="email" id="email" placeholder='Email'value={formData.email} onChange={(e)=>handleChange(e)}/>
                <input className='border-b border-gray-300 p-2 outline-none focus:border-[1px] focus:bg-gray-50 placeholder:text-center text-center' type="password" id="password" placeholder='Password' value={formData.password} onChange={(e)=>handleChange(e)}/>
                <button className='btn w-[45%]'>Sign In</button>
                <Link to={'/signup'} className='w-[45%] btn bg-green-500'>Register</Link>
            </form>
            <div className='flex flex-col items-center justify-center gap-1'>
                <h2 className='text-blue-500 hover:underline cursor-pointer'>Forget Password?</h2>
                <p  className='text-blue-500 hover:underline cursor-pointer'>Other login Methods (gmail).</p>
            </div>
        </div>
    </div>
  )
}

export default Signin