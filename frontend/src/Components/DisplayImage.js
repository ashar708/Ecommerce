import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({imageUrl,onClose}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow rounded max-w-5xl mx-auto p-2'>
        <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
          <IoMdClose/>
        </div>
        <div className='flex justify-center p-4 max-h-[80vh] max-w-[70vh]'>
        <img src={imageUrl} className='w-full h-full'/>
        </div>
        </div>
        
    </div>
  )
}

export default DisplayImage
