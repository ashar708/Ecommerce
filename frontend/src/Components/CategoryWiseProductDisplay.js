import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCateogryWiseProduct from '../helpers/fetchCateogryWiseProduct';
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const loadingList = new Array(5).fill(null);
    const {fetchProductCount} = useContext(context);

    console.log(category);

    const handleAddToCart = async (e,id) => {
        await addToCart(e,id);
        fetchProductCount();
    }
    
    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCateogryWiseProduct(category);
        setLoading(false);

        console.log("categoryproduct",categoryProduct.data);

        setData(categoryProduct.data);
    }

    useEffect(()=>{
        fetchData();
    },[])


  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll transition-all' >
        {
            loading ? (
                loadingList.map((prod,idx)=>(
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                        </div>
                        <div className='py-4 px-4 grid w-full gap-2'>
                            <h2 className='font-semibold md:text-lg text-base text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                            <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full'></p>
                            <div className='flex gap-2 w-full'>
                                <p className='text-black font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            </div>
                            <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                        </div>
                    </div>
                ))
            ) : (
            data.map((prod,idx)=>(
                <Link to={'/product/' + prod?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                    <div className='bg-slate-200 h-44 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={prod.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                    </div>
                    <div className='py-4 px-4 grid gap-3'>
                        <h2 className='font-semibold md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{prod?.productName}</h2>
                        <p className='capitalize text-slate-500'>{prod?.category}</p>
                        <div className='flex gap-2'>
                            <p className='text-black font-medium'>{displayCurrency(prod?.sellingPrice)}</p>
                            <p className='text-slate-500 line-through'>{displayCurrency(prod?.price)}</p>
                        </div>
                        <button className='text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,prod?._id)}>Add to Cart</button>
                    </div>
                </Link>
            ))
        )
        }
        </div>
      
    </div>
  )
}

export default CategoryWiseProduct;
