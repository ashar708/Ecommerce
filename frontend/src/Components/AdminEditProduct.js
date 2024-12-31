import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common/index';
import {toast} from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    info,
    fetchData
}) => {
    const [data,setData] = useState({
        ...info,
        productName: info?.productName,
        brandName: info?.brandName,
        category: info?.category,
        productImage: info?.productImage || [],
        description: info?.description,
        price: info?.price,
        sellingPrice: info?.sellingPrice
      })
      const handleOnChange = (e) => {
        const {name,value} = e.target;
    
        setData((preve)=>{
          return {
            ...preve,
            [name] : value
          }
        })
    
      }
      const [openFullScreenImage,setOpenFullScreenImage] = useState(false);
      const [fullScreenImage,setFullScreenImage] = useState("");
      //const [uploadProductImage, setOpenUploadProduct] = useState("");
      const handleUplaodImage = async (e) => {
        const file = e.target.files[0];
        // setOpenUploadProduct(file.name);
        console.log("file",file);
        const uploadImageCloudinary = await uploadImage(file);
    
        setData((preve)=>{
          return {
            ...preve,
            productImage: [...preve.productImage, uploadImageCloudinary.url]
          }
        })
    
        console.log("upload image",uploadImageCloudinary.url);
      }
      const handleDelete = async (idx) => {
        console.log("index",idx);
        const newProductImage = [data.productImage];
        newProductImage.splice(idx,1);
    
        setData((preve)=>{
          return {
            ...preve,
            productImage: [...newProductImage]
          }
        })
    
      }
      // upload product 
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data",data);
        const dataResponse = await fetch(summaryApi.updateProduct.url,{
          method: summaryApi.updateProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })
    
        const responseData = await dataResponse.json();
    
        if(responseData.success){
          toast.success(responseData?.message);
          onClose();
          fetchData();
        }
    
        if(responseData.error){
          toast.error(responseData?.message);
        }
    
      }
  return (
    <div className='fixed w-full h-full bg-slate-200 top-0 bg-opacity-35 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>
          Edit Product
          </h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
          <IoMdClose/>
        </div>
        </div>
        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>
            Product Name: 
          </label>
          <input required type='text' name='productName' id='productName' placeholder='Enter product Name' value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'/>

          <label htmlFor="brandName" className='mt-3'>
            Brand Name: 
          </label>
          <input required type='text' name="brandName" id='brandName' placeholder='Enter brand Name' value={data.brandName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'/>


          <label htmlFor="category" className='mt-3'>
            Category: 
          </label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
          <option value={""}>Select a Category</option>
            {
              
              productCategory.map((item,idx)=> {
                return (
                  <option value={item.value} key={item.value + idx}>{item.label}</option>
                )
              })
            }
          </select>


          <label htmlFor="productImage" className='mt-3'>Product Image: </label>
          <label htmlFor='UploadImage'>
          <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center cursor-pointer'>
            
            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
            <span className='text-4xl'><FaCloudUploadAlt/></span>
            <p className='text-sm'>Upload Product Image</p>
            <input type='file' id='UploadImage' className='hidden' onChange={handleUplaodImage}/>
            </div>
            
          </div>
          </label>
          <div className='text-slate-500'>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {
                    data?.productImage.map((img,idx)=>{
                      return (
                        <div className='relative group'>
                          <img src={img} alt='img' width={80} height={80} className='bg-slate-100 border cursor-pointer' onClick={()=>{
                          setOpenFullScreenImage(true);
                          setFullScreenImage(img);
                          }}/>
                          <div className='absolute bottom-0 right-0 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDelete(idx)}>
                            <MdDelete/>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>* Please Upload product Image</p>
              )
            }
            
          </div>

          <label htmlFor="price" className='mt-3'>Price: </label>
          <input required type='number' name='price' id='price' placeholder='Enter the Price' value={data.price} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'/>


          <label htmlFor="sellingPrice" className='mt-3'>Selling Price: </label>
          <input required type='number' name='sellingPrice' id='sellingPrice' placeholder='Enter the Selling Price' value={data.sellingPrice} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'/>

          <label htmlFor="description" className='mt-3'>Description: </label>
          <textarea required className='h-20 bg-slate-100 resize-none p-2' rows={3} placeholder='Enter the product description' onChange={handleOnChange} name='description' id='description' value={data.description}>

          </textarea>


          <button className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
        </form>


      </div>

      {/* display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imageUrl={fullScreenImage}/>
        )
      }
     
    </div>
  )
}

export default AdminEditProduct
