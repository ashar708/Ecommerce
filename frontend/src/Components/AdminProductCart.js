import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCart = ({
    data
    ,fetchData
}) => {
    const [editProduct,setEditProduct] = useState(false);
  return (
    <div className='bg-white p-4 rounded'>
       <div className='w-40'>
       <div className='w-32 h-32 flex justify-center items-center'>
        <img src={data?.productImage[0]} width={100} height={100} className='object-fill mx-auto h-full'/>
       </div>
        <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>
        <div>
            <p className='font-semibold'>
                {
                    displayINRCurrency(data?.sellingPrice)
                }
            </p>
            <div className='w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white' onClick={()=>setEditProduct(true)}>
            <MdModeEditOutline/>
            </div>
        </div>
        
       </div>
        {
            editProduct && <AdminEditProduct info={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
        }
        
    </div>
  )
}

export default AdminProductCart
