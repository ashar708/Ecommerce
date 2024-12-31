import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common';
import context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
   
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const cont = useContext(context);
    const loadingCart = new Array(cont.cartProductCount).fill(null);

    const fetchData = async () => {
        
        const response = await fetch(summaryApi.productView.url,{
            method: summaryApi.productView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        })
       
        const responseData = await response.json();

        if(responseData.success){
            setData(responseData.data);
        }

        console.log("cart-data",data);
        
    }

    const handleLoading = async () => {
        await fetchData();
    }

    useEffect(()=>{
        setLoading(true);
        handleLoading();
         setLoading(false);
    },[])

    const increaseQty = async (id,qty) => {
        const response = await fetch(summaryApi.updateCartQty.url,{
            method: summaryApi.updateCartQty.method,
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json();

        if(responseData.success){
            fetchData();
        }
    }


    const decreaseQty = async (id,qty) => {
        if(qty>=2){
        const response = await fetch(summaryApi.updateCartQty.url,{
            method: summaryApi.updateCartQty.method,
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty - 1
            })
        })

        const responseData = await response.json();

        if(responseData.success){
            fetchData();
        }
    }
    }

    const deleteItems = async (id) => {
        const response = await fetch(summaryApi.deleteItem.url,{
            method: summaryApi.deleteItem.method,
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json();

        if(responseData.success){
            fetchData();
            cont.fetchProductCount();
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue+currentValue.quantity,0);
    const totalPrice = data.reduce((previousValue,currentValue)=> previousValue+(currentValue.quantity*currentValue?.productId?.sellingPrice),0)

    const handlePayment = async () => {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await fetch(summaryApi.checkout.url,{
            method: summaryApi.checkout.method,
            credentials: "include",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                cartItems: data
            })
        })
        const dataresponse = await response.json();

        if(dataresponse.id){
            stripePromise.redirectToCheckout({sessionId: dataresponse.id});
        }
        console.log("payment",dataresponse);
    }

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
      {
        data.length === 0 && !loading && (
            <p className='bg-white py-5'>No data</p>
        )
      }
      </div>
      <div className='flex flex-col sm:flex-row gap-10 lg:justify-between p-4'>
        {/* view product */}
        <div className='w-full max-w-3xl'>
            {
                loading ? (
                    loadingCart.map((el,idx)=>(
                        <div key={el+"Add to cart loading"} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>

                        </div>
                    ))
                ) : (
                    data.map((prod,idx)=>{
                        return (
                            <div key={prod+"Add to cart loading"} className='w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-28 h-full bg-slate-200'>
                                <img src={prod?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/* delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteItems(prod?._id)}>
                                        <MdDelete/>
                                    </div>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{prod?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{prod?.productId?.category}</p>
                                    <div className='flex items-center justify-between'>
                                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(prod?.productId?.sellingPrice)}</p>
                                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(prod?.productId?.sellingPrice * prod.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(prod?._id,prod?.quantity)}>-</button>
                                        {prod?.quantity}
                                        <button className='border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(prod?._id,prod?.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>

        {/* total product */}
        {
            data[0] && (
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                       </div>
                    ): (
                        <div className='h-34 bg-white'>
                           <h2 className='text-white bg-red-600 px-4 py-1'>Cart Summary</h2>
                           <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                            <p>Quantity</p>
                            <p>{totalQty}</p>
                           </div>
                           <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                            <p>Total Price</p>
                            <p>{displayINRCurrency(totalPrice)}</p>
                           </div>
                           <button className='bg-blue-600 p-3 text-white w-full' onClick={handlePayment}>Checkout and Payment</button>
                        </div>
                    )
                }
                </div>
            )
        }
       
        
      </div>
    </div>
  )
}

export default Cart
