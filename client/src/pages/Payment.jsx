import React from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { updateSessionFailure, updateSessionStart, updateSessionSuccess } from '../redux/user/userSlice'


const Payment = () => {
  const {currentUser} = useSelector(state=>state.user)
  const price = 99
  const dispatch = useDispatch()
  const handlePayment = async(e) => {
    e.preventDefault()
    dispatch(updateSessionStart())
    const res = await axios.post('http://localhost:8000/api/user/create-subs-session',{price:price,customerId:currentUser._id})
    console.log(res.data);
    if (!res.data) {
     dispatch(updateSessionFailure(res.data))
    }
    dispatch(updateSessionSuccess(res.data))
    window.location = res.data.session.url
  }
  return (
    <div className='w-full h-[80vh]'>
      <div className='max-w-[60%] w-full h-full m-auto flex items-center justify-center'>
        <form onSubmit={handlePayment} className='h-max border-2 bg-slate-50 py-14 px-5 space-y-5 rounded-lg'>
            <h1 className='text-2xl sm:text-4xl font-[700] '>Subscription Pro</h1>
            <p className='text-[gray] text-2xl'>${price}</p>
            <p className='text-xl font-[300]'>Enjoy All Questions.</p>
            <button className='btn w-full'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Payment