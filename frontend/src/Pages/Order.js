import React, { useState,useEffect } from 'react'
import summaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency'

const Order = () => {
  const [data,setData] = useState([]);
  const fetchOrderDetails = async () => {
    const response = await fetch(summaryApi.order.url,{
      method: summaryApi.order.method,
      credentials: "include",
    })

    const responseData = await response.json();
    setData(responseData?.data);
    console.log("order details",responseData);
  }

  useEffect(()=>{
    fetchOrderDetails();
  },[])



  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }
      <div className='p-4 w-full'>
        {
          data.map((item,idx)=>{
            return (
              <div key={item.userId+idx} className='border'>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border-4 border-red-500 rounded'>
               <div className='flex justify-between lg:flex-row flex-col'>
               <div className='grid gap-1'>
                  {
                    item?.productDetails.map((prod,i)=>{
                      return (
                        <div key={prod.productId+i} className='flex gap-3 bg-slate-100'>
                          <img src={prod.image[0]} className='w-28 h-28 bg-slate-200 object-scale-down p-2'/>
                          <div>
                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{prod.name}</div>
                            <div className='flex items-center gap-5 mt-1'>
                            <div className='text-lg text-red-500'>{displayINRCurrency(prod.price)}</div>
                            <p>Quantity : {prod.quantity}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='flex gap-4 flex-col p-2 min-w-[320px]'>
                  <div>
                    <div className='text-lg font-medium'>Payment Details: </div>
                    <p className='ml-1'>Payment method: {item.paymentDetails.payment_method_types[0]}</p>
                    <p className='ml-1'>Payment Status: {item.paymentDetails.payment_status}</p>
                  </div>
                  <div>
                    <div className='text-lg font-medium'>
                      Shipping Details :
                    </div>
                    {
                      item.shipping_options.map((shipping,idx)=>{
                        return (
                          <div key={shipping.shipping_rate} className='ml-1'>
                            Shipping Amount: {displayINRCurrency(shipping.shipping_amount)}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
               </div>
                <div className='font-semibold ml-auto w-fit lg:text-lg min-w-[300px]'>
                  Total Amount: {displayINRCurrency(item.totalAmount)}
                </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
