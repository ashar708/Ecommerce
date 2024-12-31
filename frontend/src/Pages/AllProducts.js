import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/UploadProduct'
import summaryApi from '../common';
import AdminProductCart from '../Components/AdminProductCart';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts,setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await fetch(summaryApi.getProduct.url,{
      method: summaryApi.getProduct.method,
    })
    const responseData = await response.json();

    setAllProducts(responseData?.data || []);


  }

  useEffect(()=>{
    fetchAllProducts()
  },[])

  return (
    <div>
      <div className='bg-white px-4 py-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>All Products</h2>
        <button className='py-1 px-3 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-205px)] overflow-y-scroll'>
        {
          
          allProducts.map((prod,idx)=>{
            
            return (
              <AdminProductCart data={prod} key={idx+"all Products"} fetchData={fetchAllProducts}/>
            )
          })
        }
      </div>
      {/* upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
        )
      }
      
    </div>
  )
}

export default AllProducts
