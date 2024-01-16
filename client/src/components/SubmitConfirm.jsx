import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { resetSubmit } from '../redux/result/result'

const SubmitConfirm = ({total,anslength}) => {
   
    const dispatch = useDispatch()
  return (
    <div className='w-[80%] h-full flex flex-col gap-10 text-center  rounded-lg bg-[#ecebeb] py-32'>
        <h1 className='text-3xl text-green-700'>Successfully submitted!!</h1>
        {
            !total==0 ?
            <p className='text-2xl text-green-700'>You got {total} out of {anslength}</p>
            : <p className='text-2xl text-red-700'>Oops, you need to improve. You got {total}. </p>
        }
        <Link to={'/practise'}>
            <button onClick={()=>dispatch(resetSubmit(false))}  className='bg-yellow-400 px-5 py-2 text-sm sm:text-xl text-white rounded-lg    text-center font-[600]'>Practise More</button>
        </Link>
    </div>
  )
}

export default SubmitConfirm