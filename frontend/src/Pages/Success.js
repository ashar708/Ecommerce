import React from 'react'
import Lottie from 'react-lottie';
import success from '../asset/lotties/paymentsuccessful';
import { Link } from 'react-router-dom';

const Success = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: success,
        renderSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400}/>
      <div className='flex items-center justify-center'>
        <Link to={"/order"} className='border-2 border-green-500 py-1.5 px-1.5 rounded'>See Order</Link>
      </div>
    </div>
  )
}

export default Success
