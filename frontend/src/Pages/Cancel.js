import React from 'react'
import Lottie from 'react-lottie';
import cancel from '../asset/lotties/paymentcancel';
import { Link } from 'react-router-dom';

const Cancel = () => {
    const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: cancel,
            renderSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
  return (
    <div>
       <Lottie options={defaultOptions} height={400} width={400}/>
       <div className='flex items-center justify-center'>
        <Link to={"/cart"} className='border-2 border-red-500 py-1.5 px-1.5 rounded'>Go to cart</Link>
        </div>
    </div>
  )
}

export default Cancel
