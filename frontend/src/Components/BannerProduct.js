import React, { useEffect, useState } from 'react';
import image1mobile from '../asset/banner/img1_mobile.jpg';
import  image1 from '../asset/banner/img1.webp';
import image2mobile from '../asset/banner/img2_mobile.webp';
import image2 from '../asset/banner/img2.webp';
import image3mobile from '../asset/banner/img3_mobile.jpg';
import image3 from '../asset/banner/img3.jpg';
import image4mobile from '../asset/banner/img4_mobile.jpg';
import  image4 from '../asset/banner/img4.jpg';
import image5mobile from '../asset/banner/img5_mobile.png';
import  image5 from '../asset/banner/img5.webp';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0);
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];
    const mobileImages = [
        image1mobile,
        image2mobile,
        image3mobile,
        image4mobile,
        image5mobile
    ];
    const nextImage = () => {
        if(desktopImages.length-1 > currentImage){
            setCurrentImage((preve)=>preve+1);
        }
        
    }
    const prevImage = () => {
        if(currentImage !== 0){
            setCurrentImage((preve)=>preve-1);
        }
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage();
            }
            else{
                setCurrentImage(0);
            }
        },5000)
        return  () => {
            clearInterval(interval);
        }
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='md:h-72 h-60 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-3xl'>
                <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}><FaAngleLeft/></button>
                <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}><FaAngleRight/></button>
            </div>
        </div>
        {/* desktop and tablet version */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((el,idx) => (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={el} style={{transform: `translateX(-${currentImage*100}%)`}}>
                        <img src={el} className='w-full h-full' key={el}/>
                        </div>
                    ))
                }
        </div>

        {/* mobile version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((el,idx) => (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={el} style={{transform: `translateX(-${currentImage*100}%)`}}>
                        <img src={el} className='w-full h-full object-cover' key={el}/>
                        </div>
                    ))
                }
        </div>
        
      </div>
    </div>
  )
}

export default BannerProduct
