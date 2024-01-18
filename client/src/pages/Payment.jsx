import React from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { updateFailure,updateStart, updateSuccess } from '../redux/user/userSlice'


const Payment = () => {
  const {currentUser} = useSelector(state=>state.user)
  const price = 99
  const dispatch = useDispatch()
  const handlePayment = async(e) => {
    e.preventDefault()
    dispatch(updateStart())
    try {
      const res = await axios.post('http://localhost:8000/api/user/create-subs-session',{price:price,customerId:currentUser._id})
      if (!res.data) {
      dispatch(updateFailure(res.data))
      }
      dispatch(updateSuccess(res.data.updateUserSession))
      window.location = res.data.session.url
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
    
  }
  return (
    <div className='w-full h-[80vh]'>
      <div className='max-w-[60%] w-full h-full m-auto flex flex-col py-32 gap-5'>
        <h1 className='text-xl sm:text-4xl capitalize font-[700]'>Please Subscribe to pro account so you can get all questions.</h1>
        <form onSubmit={handlePayment} className='w-[50%] h-max border-2 bg-slate-50 py-14 px-5 space-y-5 rounded-lg'>
            <h1 className='text-2xl sm:text-4xl font-[700] '>Subscription Pro</h1>
            <p className='text-[gray] text-2xl'>${price}</p>
            <p className='text-xl font-[300]'>Enjoy All Questions.</p>
            <button className='btn px-14'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Payment