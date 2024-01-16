import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Home = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='w-full h-[80vh]'>
      <div className='w-full max-w-[60%] m-auto flex flex-col gap-10 items-center justify-center py-20'>
        <div className='w-full flex gap-5 '>
          <div className='flex-1 flex flex-col gap-5 '>
            <h1 className='text-xl sm:text-4xl font-[700]'>PTE CLASS</h1>
            <p className='text-xl text-[#afaeae]'>We provide a variety of questions to practise with.You can practise your listening,reading,writing and speaking to score the best. For now, we have listening part only. Other aspects of learning is in process of building.There are some free questions for you to begin with.</p>
            <Link to={'/practise'} className='btn'>Start Practising</Link>
          </div>
          <div className='flex-1 bg-slate-50 rounded-lg p-5 space-y-3'>
            <h2 className='text-xl sm:text-3xl font-[500]'>Switch to Pro to unlock all the questions.</h2>
            <p className='text-lg text-[#9b9a9a]'>Special Offer is waiting for you!!</p>
            {
              currentUser?.subscribed==='no' && <button className='btn bg-green-400'>Go for Pro</button>
            }
            <p className='text-lg text-[#9b9a9a]'>Unlock all Practise all.</p>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 bg-slate-100 p-5 rounded-lg'>
          <h3 className='text-lg sm:text-3xl font-[600]'>Contact Info</h3>
          <span className='text-lg text-[#afaeae]'>Ph.9860806080</span>
          <span className='text-lg text-[#afaeae]'>Email: apeuni@gmail.com</span>
        </div>
      </div>
    </div>
  )
}

export default Home