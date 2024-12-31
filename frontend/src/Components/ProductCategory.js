import React, { useEffect, useState } from 'react'
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
    const [categoryProduct,setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(false);

    const categoryLoading = new Array(5).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(summaryApi.productCategory.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    }

    useEffect(()=>{
        fetchCategoryProduct();
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll overflow-x-hidden overflow-y-hidden'>
        {
            loading? (
                        categoryLoading.map((el,idx)=>(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+idx}></div>
                        ))
            ) : (
                categoryProduct.map((item,idx) => (
                    <Link to={"/product-category?category=" + item.category} className='cursor-pointer' key={item.category+idx}>
                        <div className='w-16 h-16 md:w-20 md:h-20 flex rounded-full p-4 bg-slate-200 items-center justify-center'>
                            <img src={item?.productImage[0]} alt={item?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                        </div>
                        <p className='text-center text-sm md:text-base capitalize'>
                            {item.category}
                        </p>
                    </Link>
                ))
            )
            
        }
        </div>
    </div>
  )
}

export default ProductCategory
