import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice'

const Navbar = () => {
    const [signin,setSignin] = useState(false)
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show,setShow]=useState(false)
    const handleClick = () =>{
        setSignin(false)
        setShow(false)
    }
    
    const handleLogout =async ()=>{
        dispatch(signOutStart())
        try {
           const res= await axios.get('http://localhost:8000/api/logout')
           if(!res){
            dispatch(signOutFailure(res.data))
           }
            dispatch(signOutSuccess())
            navigate('/signin')
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
        
    }
  return (
    <div className={`w-full h-5vh bg-slate-50 ${signin ? '':'border-b-2'}  border-[#d8d8d8]`}>
        <div className='w-full sm:max-w-[60%] m-auto h-full flex justify-between items-center py-2'>
            <div className=' flex items-center gap-8' onClick={handleClick}>
                <Link to={'/'}><img width={140} src={"logo.png"} alt="logo" className='cursor-pointer' /></Link>
                <Link to={"/"} >
                    <div className='text-md font-[400]  text-[gray]' >Home</div>
                </Link>
                <Link to={"/practise"} >
                    <div className='text-md font-[400] text-[gray]'>Practise</div>
                </Link>
            </div>
            <div className=' flex items-center justify-self-end gap-8'>
                {  
                    currentUser ? 
                    
                     <div className='text-center cursor-pointer relative flex items-center gap-5 ' >
                       <Link to={currentUser.role == 'admin'? '/add':'/payment'} className={`whitespace-nowrap btn bg-green-400 ${(currentUser.role==='user'&&currentUser.subscribed==='yes')?'hidden':'block'} `}>
                        {
                            currentUser.role==='admin'
                            ? 'Add Questions'
                            : (currentUser.role==='user' && currentUser.subscribed==='no')
                            ? 'Switch to Pro'
                            : ''
                        }
                       </Link>
                       
                        <p onClick={()=>setShow(prev=>!prev)} className={`capitalize text-xl font-[300] text-[#a1a1a1] `}>{currentUser.username}</p>
                     { 
                        show 
                        ? (
                        <div className='w-[200px] flex flex-col rounded-md cursor-pointer bg-green-400 absolute top-16 right-0 text-right text-white text-xl overflow-hidden ' onClick={()=>setShow(false)}>
                            <Link to={`/profile/${currentUser?._id}`} className='hoverDisplay'>Account</Link>
                            <Link to={currentUser.role == 'admin'? '/add':'/payment'} className={`hoverDisplay ${(currentUser.role==='user'&&currentUser.subscribed==='yes')?'hidden':'block'} `}>
                                {
                                    currentUser.role==='admin'
                                    ? 'Add Questions'
                                    : (currentUser.role==='user' && currentUser.subscribed==='no')
                                    ? 'Switch to Pro'
                                    : ''
                                }
                            </Link>
                            <div className='hoverDisplay' onClick={()=>handleLogout()}>Logout</div>
                        </div>)
                        :''
                     }
                     </div>
                    
                   :
                    signin
                    ? (
                        <button className='text-md font-[400] text-[gray]'>Sign In</button>
                    )
                    : (<>
                         <Link to={'/signin'} className='text-md font-[400] text-[gray]'>
                            <button onClick={()=>setSignin(true)}>Login</button>
                        </Link>
                         <Link to={'/signup'} className='text-md font-[300] text-[#12D3BF]  border-[1px] px-4 py-1 rounded-full border-[#12D3BF]'>
                            <button onClick={()=>setSignin(true)}>Sign Up</button>
                        </Link>
                    </>)
                }
               
            </div>
        </div>
    </div>
  )
}

export default Navbar