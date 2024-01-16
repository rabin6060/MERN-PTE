import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:''  
    })
  const navigate = useNavigate()
  
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setFormData({
      username:'',
      email:'',
      password:''  
    })
    try {
      const res  = await axios.post('http://localhost:8000/api/signup',formData)
      if(!res.data) {
        console.log('user creation failed')
      }
      alert(res.data.message)
      navigate('/signin')
    } catch (error) {
      console.log(error);
    }
    
  }
  
  return (
    <div className='w-full h-full bg-white flex items-center justify-center'>
        <div className='w-full sm:max-w-[60%] m-auto h-full flex flex-col items-center my-28 gap-10'>
            <h1 className='text-4xl font-[400]'>Register</h1>
            <form onSubmit={handleSubmit} className='w-full sm:max-w-[50%] flex flex-col justify-center items-center text-center gap-10 px-20'>
                <input className='border-b border-gray-300 p-2 outline-none focus:border-[1px] focus:bg-gray-50 placeholder:text-center text-center' value={formData.username} type="text" id="username" placeholder='Name' onChange={(e)=>handleChange(e)} required/>
                <input className='border-b border-gray-300 p-2 outline-none focus:border-[1px] focus:bg-gray-50 placeholder:text-center text-center'  value={formData.email}type="email" id="email" placeholder='Email' onChange={(e)=>handleChange(e)} required/>
                <input className='border-b border-gray-300 p-2 outline-none focus:border-[1px] focus:bg-gray-50 placeholder:text-center text-center' value={formData.password} type="password" id="password" placeholder='Password' onChange={(e)=>handleChange(e)} required/>
                <button className='w-[45%] btn'>Register</button>
            </form>
            <div className='flex flex-col items-center justify-center gap-1'>
                <Link to={'/signin'} className='text-blue-500 hover:underline'>SignIn</Link>
                <p  className='text-blue-500 hover:underline cursor-pointer'>Haven't Recieved conformation email?</p>
            </div>
        </div>
    </div>
  )
}

export default Signup