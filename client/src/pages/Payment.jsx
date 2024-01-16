import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const Payment = () => {
  return (
    <div className='w-full h-[80vh]'>
        <div className='max-w-[60%] w-full h-full m-auto '>
            payment
        </div>
    </div>
  )
}

export default Payment