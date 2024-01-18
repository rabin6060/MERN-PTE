import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Success = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user)
  const sessionId = currentUser.sessionId
  console.log(sessionId);
  const navigate = useNavigate()
  const handleClick =async ()=>{
    dispatch(updateStart())
    try {
      const res = await axios.post('http://localhost:8000/api/user/updateSubsStatus',{sessionId})
      console.log(res)
      if (!res) {
        updateFailure(res.data)
      }
      updateSuccess(res.data)
      navigate('/')
    } catch (error) {
      console.log(error.message);
      dispatch(updateFailure(error.message))
    }
    
  }
  return (
    <div className='h-[80vh]'>
      <div className='max-w-[60%] w-full h-full m-auto flex items-center justify-center'>
        <div className='w-full bg-slate-50 space-y-5 p-10 rounded-lg' >
          <h1 className='text-xl sm:text-4xl font-extrabold text-green-700'>Success</h1>
          <button onClick={handleClick} className='btn'>Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default Success